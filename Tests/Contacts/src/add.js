import ContactStore from "./contacts.js";

class AddContactPage {
    constructor(store) {
        this.store = store;
        this.form = document.getElementById("add-form");
        this.nameInput = document.getElementById("name-input");
        this.emailInput = document.getElementById("email-input");
        this.errorMessage = document.getElementById("error-message");

        this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = this.nameInput.value;
        const email = this.emailInput.value;

        if (!this.store.isValidContact(name, email)) {
            this.errorMessage.textContent = "Veuillez entrer un nom et un courriel valide.";
            this.errorMessage.hidden = false;
            return;
        }

        this.store.add({ name: name.trim(), email: email.trim() });
        window.location.href = "index.html";
    }
}

new AddContactPage(new ContactStore());
