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

// TODO : remettre la limite du jeton à MAX_REQUESTS si le jeton existe
app.patch("/token/reset", (req, res) => {
    const token = req.get("X-AUTH");
    if (limits.has(token)) {
        limits.set(token, { count: MAX_REQUESTS });
        res.set("X-LIMIT", MAX_REQUESTS);
        res.status(204).send();
        return;
    }
    res.status(404).send("Ce jeton n'existe pas");
});

// TODO: Implémenter la récupération des livres avec une gestion des
// requêtes permises
app.use('/books', (req, res, next) => {
    const token = req.get("X-AUTH");
    if (!token || !limits.has(token)) {
        return res.status(403).send();
    }
    const newLimit = limits.get(token);

    /* Exercice #2 : vérifier la limite en fonction du temps */
    requestTimeoutHandler(newLimit);

    if (newLimit.count - 1 < 0) {
        return res.status(429).send();
    }

    newLimit.count--;
    res.set("X-LIMIT", newLimit.count);
    next();

})

app.get('/books', (req, res) => {
    const maxCount = parseInt(req.query.maxCount);
    if (maxCount) {
        return res.send(books.slice(0, maxCount));
    }
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    const random = req.query.random;
    if (random === 'true') {
        const randomIndex = Math.floor(Math.random() * books.length + 1);
        return res.send(books[randomIndex]);
    }
    const book = books.find(x => x.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send("Ce livre n'existe pas");
    }
    res.send(book);
});

app.delete('/reset', (req, res) => {
    limits.clear();
    res.send({ tokenCount: limits.size });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur disponible sur localhost:${PORT}`);
});

/* Exercice supplémentaire */
/**
 * Vérifie s'il y a eu assez de temps écoulé entre la 1re requête et maintenant
 * Si oui, le compteur de requêtes disponibles est remis à sa valeur maximale
 * et l'attribut firstAccess est mis au moment de la requête
 * @param {{count:number, firstAccess:Date}} newLimit 
 * @returns l'objet newLimit mis à jour
 */
function requestTimeoutHandler(newLimit) {
    const accessTime = new Date();
    // La 1re fois firstAcces serait undefined
    const timeDiff = newLimit.firstAccess
        ? Math.floor((accessTime - newLimit.firstAccess) / 1000)
        : MAX_TIMEOUT;
    if (timeDiff >= MAX_TIMEOUT) {
        newLimit.count = MAX_REQUESTS;
        newLimit.firstAccess = accessTime;
    }
    return newLimit;
}