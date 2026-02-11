const express = require('express');
const app = express();
const crypto = require('crypto');

const DEFAULT_DATA = require('./default').DEFAULT_DATA;
const urlDatabase = structuredClone(DEFAULT_DATA);

const SERVER_PORT = 3000;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

app.use(express.json());

app.delete('/reset', (req, res) => {
    urlDatabase.length = 0;
    for (const entry of DEFAULT_DATA) {
        urlDatabase.push(structuredClone(entry));
    }
    res.json({ message: 'Database reset' });
});

// Retourne un code court aléatoire de 6 caractères
// Note : à des fins de simplicité, on ne gère pas les collisions
function generateShortcode() {
    return crypto.randomBytes(3).toString('hex');
}

// Valide l'URL fournie dans le corps de la requête
app.post('/shorten', (req, res, next) => {
    try {
        new URL(req.body.url);
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid URL' });
    }
});

/*  
    TODO : Extraire l'URL à raccourcir du corps de la requête
    Si l'URL est déjà présent dans la base de données, retourner un objet { shortCode, shortUrl } et un code approprié
    Sinon, génèrer un code court aléatoire, l'ajouter à la base de données et retourner un objet { shortCode, shortUrl } 
*/
app.post('/shorten', (req, res) => {
    const shortcode = generateShortcode();
    res.json({ shortcode, shortUrl: `${SERVER_URL}/sh/${shortcode}` });
});

/*  
    TODO : Vérifie si le code court existe dans la base de données
    Si oui, l'ajoute comme propriété de la requête
    Sinon, renvoie une réponse appropriée au client
*/
function findUrl(req, res, next) {
    const entry = null; // todo : trouver l'entrée dans la base de données
    req.urlEntry = entry;
}


// TODO : Configurer le routeur.
// TODO : Vérifier si le code court existe dans la base de données
const router = express.Router();
router.use('/:shortcode', findUrl);

/* 
    TODO : Implémenter les gestionnaires suivants : 
    - Incrémenter le compteur d'accès et rediriger vers l'URL d'origine. Ex : /sh/abc123
    - Obtenir les statistiques pour un code court donné. Ex : /sh/abc123/stats
    - Réinitialiser le compteur d'accès pour un code court donné Ex : /sh/abc123/reset
*/



// Code fourni pour démarrer le serveur
function launchServer() {
    return app.listen(`${SERVER_PORT}`, () => {
        console.log(`URL shortener running on ${SERVER_URL}`);
    });
}

module.exports = { launchServer, app };