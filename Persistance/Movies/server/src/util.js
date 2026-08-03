const { pool } = require('./db');

/**
 * Liste blanche des champs exposés par l'API : nom du champ -> expression SQL correspondante.
 *
 * IMPORTANT : un nom de colonne ne peut PAS être passé en paramètre d'une requête préparée
 * ($1 ne remplace qu'une VALEUR). Un champ demandé par le client doit donc être validé contre
 * cette liste avant d'être inséré dans la requête, sinon on ouvre une injection SQL.
 *
 * L'ordre des clés est celui des champs dans la réponse JSON.
 * `genre` n'a pas de colonne : il doit être reconstruit à partir de la table `movie_genres`.
 */
const FIELDS = {
    title: 'm.title',
    year: 'm.year',
    genre: null,
    director: 'd.name',
    country: 'm.country',
    language: 'm.language',
    runtime: 'm.runtime',
    imdbRating: 'm.imdb_rating',
    budget: 'm.budget',
    boxOffice: 'm.box_office',
    releaseDate: 'm.release_date'
};

/** Liste blanche des champs de tri : ORDER BY ne peut pas non plus être paramétré. */
const SORT_FIELDS = {
    year: 'm.year',
    imdbRating: 'm.imdb_rating',
    runtime: 'm.runtime',
    boxOffice: 'm.box_office',
    title: 'm.title'
};

/**
 * Convertit un paramètre de requête en nombre et lance une erreur s'il est invalide.
 * @param {string} value valeur reçue dans l'URI
 * @param {string} name nom du paramètre, utilisé dans le message d'erreur
 * @returns {number} valeur convertie
 */
function parseNumber(value, name) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new Error(`Valeur invalide pour le paramètre ${name} : ${value}`);
    }
    return parsed;
}

/**
 * Valide qu'un champ fait partie de la liste blanche.
 * Object.hasOwn et non `in` : `'toString' in FIELDS` serait vrai (propriété héritée).
 * @param {string} field nom du champ à valider
 */
function validateField(field) {
    if (!Object.hasOwn(FIELDS, field)) {
        throw new Error(`Champ invalide : ${field}`);
    }
}

/**
 * Récupère TOUS les genres des films donnés.
 *
 * Cette deuxième requête est nécessaire : si on lisait les genres à partir des jointures de la
 * requête principale, un film trouvé avec `genre=Action` ne retournerait que le genre "Action"
 * au lieu de la liste complète de ses genres.
 *
 * @param {Array<number>} movieIds identifiants des films trouvés
 * @returns {Promise<Map<number, Array<string>>>} genres regroupés par identifiant de film
 */
async function fetchGenres(movieIds) {
    const placeholders = movieIds.map((_, index) => `$${index + 1}`);
    const result = await pool.query(`
        SELECT mg.movie_id, g.name
        FROM movie_genres mg
        INNER JOIN genres g ON g.id = mg.genre_id
        WHERE mg.movie_id IN (${placeholders.join(', ')})
        ORDER BY g.name`, movieIds);

    const genresByMovie = new Map();
    result.rows.forEach((row) => {
        if (!genresByMovie.has(row.movie_id)) {
            genresByMovie.set(row.movie_id, []);
        }
        genresByMovie.get(row.movie_id).push(row.name);
    });
    return genresByMovie;
}

module.exports = {
    FIELDS,
    SORT_FIELDS,
    parseNumber,
    validateField,
    fetchGenres
};
