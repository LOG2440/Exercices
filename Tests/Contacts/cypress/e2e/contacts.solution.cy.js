describe.skip("Carnet de contacts", () => {
    beforeEach(() => {
        cy.visit("/index.html");
    });

    describe("Page d'accueil", () => {
        it("affiche le titre et les 3 contacts par défaut", () => {
            cy.get("h1").should("have.text", "Carnet de contacts");
            cy.get(".contact-item").should("have.length", 3);
            cy.get(".contact-item").first().should("contain.text", "Alice Tremblay");
        });

        it("cache le message vide quand il y a des contacts", () => {
            cy.get("#empty-message").should("be.hidden");
        });

        it("filtre la liste en tapant dans la recherche", () => {
            cy.get("#search-input").type("benoit");
            cy.get(".contact-item").should("have.length", 1);
            cy.get(".contact-item").should("contain.text", "Benoit Roy");
        });

        it("affiche le message vide quand la recherche ne trouve rien", () => {
            cy.get("#search-input").type("zzzzz");
            cy.get(".contact-item").should("have.length", 0);
            cy.get("#empty-message").should("be.visible");
        });

        it("supprime un contact au clic sur Supprimer", () => {
            cy.get(".contact-item").contains("Alice Tremblay").parent().find(".delete-btn").click();
            cy.get(".contact-item").should("have.length", 2);
            cy.get(".contact-item").should("not.contain.text", "Alice Tremblay");
        });

        it("conserve les contacts après un rechargement de la page", () => {
            cy.get(".contact-item").contains("Alice Tremblay").parent().find(".delete-btn").click();
            cy.reload();
            cy.get(".contact-item").should("have.length", 2);
        });
    });

    describe("Navigation", () => {
        it("marque le lien Accueil comme actif sur la page d'accueil", () => {
            cy.get("#nav-home").should("have.class", "active");
            cy.get("#nav-add").should("not.have.class", "active");
        });

        it("navigue vers la page d'ajout au clic sur le lien Ajouter", () => {
            cy.get("#nav-add").click();
            cy.url().should("include", "/add.html");
            cy.get("#nav-add").should("have.class", "active");
        });
    });

    describe("Page d'ajout", () => {
        beforeEach(() => {
            cy.visit("/add.html");
        });

        it("affiche une erreur si le formulaire est soumis vide", () => {
            cy.get("#add-form").submit();
            cy.get("#error-message").should("be.visible");
            cy.url().should("include", "/add.html");
        });

        it("ajoute un nouveau contact et retourne à la liste", () => {
            cy.get("#name-input").type("David Bouchard");
            cy.get("#email-input").type("david.bouchard@example.com");
            cy.get("#add-form").submit();

            cy.url().should("include", "/index.html");
            cy.get(".contact-item").should("have.length", 4);
            cy.get(".contact-item").should("contain.text", "David Bouchard");
        });
    });
});
