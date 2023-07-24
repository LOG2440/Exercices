const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const books = require('./books');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const limits = new Map();
const MAX_REQUESTS = 5;
const MAX_TIMEOUT = 10;

// À des fins de débogage, la clé 'abc' est rajoutée par défaut
limits.set('abc', { count: MAX_REQUESTS });

// Permettre nos propres en-têtes
app.use((req, res, next) => {
    res.set("Access-Control-Expose-Headers", "X-LIMIT");
    next();
});

app.get('/token', (req, res) => {
    const token = uuidv4();
    limits.set(token, { count: MAX_REQUESTS });
    res.send({ token, tokenCount: limits.size });
});

/* TODO: Implémenter la récupération des livres 
    avec une gestion des requêtes permises.
    Une requête GET vers /books?maxCount={true|false} devrait retourner tous les livres
    ou maxCount livres si l'attribut est présent
    Une requête GET vers /books/{id}?random=true devrait retourner un livre en fonction
    de son id ou un livre aléatoire si l'attribut random est présent et a la valeur "true"
    Toute requête HTTPvers /book/* devrait contenir l'en-tête X-AUTH pour être acceptée
    Sinon la réponse est 403 Forbidden
    Chaque requête acceptée diminue le compteur pour ce jeton de 1
    Si le compteur est = 0, la réponse est 429 Too Many Requests
*/


// TODO : remettre la limite du jeton à MAX_REQUESTS si le jeton existe
app.patch("/token/reset", (req, res) => {
    res.status(404).send("Ce jeton n'existe pas");
});

app.delete('/reset', (req, res) => {
    limits.clear();
    res.send({ tokenCount: limits.size });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur disponible sur localhost:${PORT}`);
});

/** Exercice supplémentaire
 * Vérifie s'il y a eu assez de temps écoulé entre la 1re requête et maintenant
 * Si oui, le compteur de requêtes disponibles est remis à sa valeur maximale
 * et l'attribut firstAccess est mis au moment de la requête
 * @param {{count:number, firstAccess:Date}} newLimit 
 * @returns l'objet newLimit mis à jour
 */
function requestTimeoutHandler(newLimit) {
    return newLimit;
}