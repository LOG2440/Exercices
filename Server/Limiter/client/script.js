const SERVER_URL = 'http://localhost:3000';
const messageField = document.getElementById("message");
const bookParent = document.getElementById("book-parent");
let token = '';

// Récupérer un nouveau jeton du serveur seulement si on n'a pas déjà un
document.getElementById("token-btn").addEventListener("click", async () => {
    if (!token) {
        const res = await fetch(`${SERVER_URL}/token`);
        const json = await res.json();
        token = json.token;
        messageField.textContent = `Vous avez le jeton: ${json.token}. Il y a un total de ${json.tokenCount} jetons sur le serveur`;
    }
});

// Réinitialiser la limite du jeton en cours
// Devrait recevoir 404 si le jeton envoyé n'est pas bon
document.getElementById("reset-btn").addEventListener("click", async () => {
    const response = await fetch(`${SERVER_URL}/token/reset`, { method: 'PATCH', headers: { "X-AUTH": token } });
    if (response.status === 404) {
        messageField.textContent = await response.text();
        return;
    }
    if (response.status === 204) {
        messageField.textContent = `Requêtes restantes : ${response.headers.get('X-Limit')}`;
    }
});

// Supprimer tous les jetons du serveur
document.getElementById("reset-all-btn").addEventListener("click", async () => {
    const response = await fetch(`${SERVER_URL}/reset`, { method: 'DELETE' });
    const serverTokens = await response.json();
    messageField.textContent = `Jetons sur le serveur : ${serverTokens.tokenCount}`;
    token = '';
});

// Récupérer tous les livres ou maxCount du serveur et les afficher dans une liste
document.getElementById("books-btn").addEventListener("click", async () => {
    const maxCount = document.getElementById("maxCount").value;
    const query = maxCount >= 0 ? `?maxCount=${maxCount}` : '';
    const response = await fetch(`${SERVER_URL}/books/${query}`, {
        headers: { "X-AUTH": token }
    });

    if (!handleError(response)) return;

    const books = await response.json();
    bookParent.innerHTML = '';
    books.forEach((book, index) => {
        const bookElement = document.createElement('li');
        bookElement.textContent = `${index + 1} : ${book.title}`;
        bookParent.append(bookElement);
    });
});

// Récupérer un livre en fonction de son id du serveur ou un livre aléatoire
document.getElementById("specific-book-btn").addEventListener("click", async () => {
    const bookId = document.getElementById("bookId").value;
    const random = document.getElementById("random").checked;
    const response = await fetch(`${SERVER_URL}/books/${bookId}?random=${random}`, {
        headers: { "X-AUTH": token }
    });
    if (response.status === 404) {
        messageField.textContent = await response.text();
        return;
    }
    if (!handleError(response)) return;

    const book = await response.json();
    document.getElementById("specific-book-parent").textContent = book.title;
});

/**
 * Gestion des messages d'erreur en lien avec la limite
 * @param {Response} response réponse du serveur
 * @returns false si erreur 403 ou 429
 */
function handleError(response) {
    if (response.status === 403) {
        messageField.textContent = 'Mauvais jeton envoyé';
        return false;
    }
    if (response.status === 429) {
        messageField.textContent = 'Vous avez atteint votre limite';
        return false;
    }
    messageField.textContent = `Requêtes restantes : ${response.headers.get('X-Limit')}`;
    return true;
}