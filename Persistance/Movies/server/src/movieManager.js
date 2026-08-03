const { pool } = require('./db');
const { FIELDS, SORT_FIELDS, fetchGenres } = require('./util');

/**
 * Retourne la liste des genres d'un film.
 * @param {number} movieId identifiant du film
 * @returns {Promise<Array<string>>} genres du film, ou tableau vide si le film n'a aucun genre
 */
async function getMovieGenres(movieId) {
    const genresByMovie = await fetchGenres([movieId]);
    const genres = genresByMovie.get(movieId);
    return genres ? genres : [];
}

/**
 * Fonction principale à implémenter pour la recherche de films
 * @param {Object} queryParams - Paramètres de requête HTTP pour la recherche de films
 * @param {string} [queryParams.year] - Année exacte du film (ex: "1999")
 * @param {string} [queryParams.yearFrom] - Année de début pour une plage (ex: "1990")
 * @param {string} [queryParams.yearTo] - Année de fin pour une plage (ex: "2000")
 * @param {string} [queryParams.genre] - Genres séparés par virgules, logique OR (ex: "Action,Sci-Fi")
 * @param {string} [queryParams.director] - Nom du réalisateur (recherche partielle, insensible à la casse)
 * @param {string} [queryParams.country] - Pays de production exact
 * @param {string} [queryParams.language] - Langue exacte du film
 * @param {string} [queryParams.minRating] - Note IMDB minimum (ex: "8.0")
 * @param {string} [queryParams.maxRating] - Note IMDB maximum (ex: "9.5")
 * @param {string} [queryParams.minRuntime] - Durée minimum en minutes (ex: "120")
 * @param {string} [queryParams.maxRuntime] - Durée maximum en minutes (ex: "180")
 * @param {string} [queryParams.minBudget] - Budget minimum (ex: "50000000")
 * @param {string} [queryParams.maxBudget] - Budget maximum (ex: "200000000")
 * @param {string} [queryParams.sortBy] - Champ de tri ("year", "imdbRating", "runtime", "boxOffice", "title")
 * @param {string} [queryParams.sortOrder] - Ordre de tri ("asc" ou "desc")
 * @param {string} [queryParams.fields] - Champs à inclure/exclure (ex: "title,year,imdbRating" ou "-budget,-boxOffice")
 * @returns {Promise<Array>} - Liste des films correspondant aux critères
 */
async function searchMovies(queryParams) {

    // TODO: Implémenter la logique de recherche
    //
    // 1. Déterminer les champs à retourner à partir de `queryParams.fields` (liste blanche FIELDS)
    // 2. Construire les conditions du WHERE et le tableau des valeurs des paramètres $1, $2, ...
    // 3. Construire la liste des colonnes du SELECT et la clause ORDER BY
    // 4. Exécuter la requête avec pool.query(sql, values)
    // 5. Récupérer les genres de chaque film trouvé et construire la réponse

    // Exemple de base (à remplacer par votre implémentation)
    const result = await pool.query(`
        SELECT m.title, m.year, d.name AS "director"
        FROM movies m
        INNER JOIN directors d ON d.id = m.director_id`);

    return result.rows;
}

module.exports = {
    searchMovies,
    getMovieGenres
};
