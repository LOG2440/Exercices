export default class ContactStore {
    #STORAGE_KEY = "contacts";

    #DEFAULT_CONTACTS = [
        { name: "Alice Tremblay", email: "alice.tremblay@example.com" },
        { name: "Benoit Roy", email: "benoit.roy@example.com" },
        { name: "Chloé Gagnon", email: "chloe.gagnon@example.com" },
    ];

    seed() {
        if (localStorage.getItem(this.#STORAGE_KEY) === null) {
            this.save(this.#DEFAULT_CONTACTS);
        }
    }

    getAll() {
        return JSON.parse(localStorage.getItem(this.#STORAGE_KEY)) ?? [];
    }

    save(contacts) {
        localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(contacts));
    }

    add(contact) {
        const contacts = this.getAll();
        contacts.push(contact);
        this.save(contacts);
    }

    delete(email) {
        const contacts = this.getAll().filter((contact) => contact.email !== email);
        this.save(contacts);
    }

    filter(contacts, query) {
        const normalizedQuery = query.trim().toLowerCase();
        if (normalizedQuery === "") {
            return contacts;
        }
        return contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(normalizedQuery) ||
                contact.email.toLowerCase().includes(normalizedQuery)
        );
    }

    isValidContact(name, email) {
        return name.trim() !== "" && email.trim() !== "" && email.includes("@");
    }
}
