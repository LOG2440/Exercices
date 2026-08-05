import ContactStore from "./contacts.js";

class ContactListPage {
    constructor(store) {
        this.store = store;
        this.listElement = document.getElementById("contact-list");
        this.emptyMessage = document.getElementById("empty-message");
        this.searchInput = document.getElementById("search-input");

        this.searchInput.addEventListener("input", () => this.renderFiltered());
    }

    render(contacts) {
        this.listElement.innerHTML = "";
        this.emptyMessage.hidden = contacts.length !== 0;

        for (const contact of contacts) {
            const item = document.createElement("li");
            item.className = "contact-item";

            const info = document.createElement("span");
            info.className = "contact-info";
            info.textContent = `${contact.name} — ${contact.email}`;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener("click", () => {
                this.store.delete(contact.email);
                this.renderFiltered();
            });

            item.append(info, deleteButton);
            this.listElement.append(item);
        }
    }

    renderFiltered() {
        this.render(this.store.filter(this.store.getAll(), this.searchInput.value));
    }
}

const store = new ContactStore();
store.seed();
new ContactListPage(store).renderFiltered();
