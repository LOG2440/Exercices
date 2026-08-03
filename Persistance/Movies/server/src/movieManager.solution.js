const { pool } = require('./db');
const { FIELDS, SORT_FIELDS, parseNumber, validateField, fetchGenres } = require('./util');

/**
 * Retourne la liste des genres d'un film.
 * @param {number} movieId identifiant du film
 * @returns {Promise<Array<string>>} genres du film, ou tableau vide si le film n'a aucun genre
 */
async function getMovieGenres(movieId) {
    const genresByMovie = await fetchGenres([movieId]);
    return genresByMovie.get(movieId) ?? [];
}

/**
 * Détermine la liste des champs à retourner à partir du paramètre `fields`.
 * @param {string} [fieldsParam] liste de champs séparés par des virgules, préfixés de `-` pour exclure
 * @returns {Array<string>} champs à retourner, dans l'ordre canonique
 */
function resolveFields(fieldsParam) {
    const allFields = Object.keys(FIELDS);
    if (!fieldsParam) return allFields;

    const requested = fieldsParam.split(',').map((f) => f.trim()).filter((f) => f.length > 0);
    const isExclusion = requested.some((f) => f.startsWith('-'));

    if (isExclusion) {
        if (requested.some((f) => !f.startsWith('-'))) {
            throw new Error("Impossible de combiner l'inclusion et l'exclusion de champs");
        }
        const excluded = requested.map((f) => f.substring(1));
        excluded.forEach(validateField);
        return allFields.filter((f) => !excluded.includes(f));
    }

    requested.forEach(validateField);
    // on conserve l'ordre canonique des champs, peu importe l'ordre demandé par le client
    return allFields.filter((f) => requested.includes(f));
}

/**
 * Construit les conditions du WHERE et le tableau des valeurs associées aux paramètres $N.
 * @param {Object} queryParams paramètres de requête HTTP
 * @returns {{conditions: Array<string>, values: Array<*>, genreJoin: string}}
 */
function buildFilters(queryParams) {
    const conditions = [];
    const values = [];

    // le numéro du paramètre ($1, $2, ...) correspond à la position de la valeur dans le tableau
    const addCondition = (column, operator, value) => {
        values.push(value);
        conditions.push(`${column} ${operator} $${values.length}`);
    };

    // l'année exacte a priorité sur la plage d'années
    if (queryParams.year) {
        addCondition('m.year', '=', parseNumber(queryParams.year, 'year'));
    } else {
        if (queryParams.yearFrom) addCondition('m.year', '>=', parseNumber(queryParams.yearFrom, 'yearFrom'));
        if (queryParams.yearTo) addCondition('m.year', '<=', parseNumber(queryParams.yearTo, 'yearTo'));
    }

    if (queryParams.country) addCondition('m.country', '=', queryParams.country);
    if (queryParams.language) addCondition('m.language', '=', queryParams.language);

    // ILIKE : recherche partielle insensible à la casse. Les % font partie de la VALEUR envoyée
    // en paramètre, jamais de la chaîne de caractères de la requête.
    if (queryParams.director) addCondition('d.name', 'ILIKE', `%${queryParams.director}%`);

    if (queryParams.minRating) addCondition('m.imdb_rating', '>=', parseNumber(queryParams.minRating, 'minRating'));
    if (queryParams.maxRating) addCondition('m.imdb_rating', '<=', parseNumber(queryParams.maxRating, 'maxRating'));
    if (queryParams.minRuntime) addCondition('m.runtime', '>=', parseNumber(queryParams.minRuntime, 'minRuntime'));
    if (queryParams.maxRuntime) addCondition('m.runtime', '<=', parseNumber(queryParams.maxRuntime, 'maxRuntime'));
    if (queryParams.minBudget) addCondition('m.budget', '>=', parseNumber(queryParams.minBudget, 'minBudget'));
    if (queryParams.maxBudget) addCondition('m.budget', '<=', parseNumber(queryParams.maxBudget, 'maxBudget'));

    // Le filtre par genre passe par la table d'association : les jointures ne sont ajoutées
    // que si le paramètre est présent.
    let genreJoin = '';
    if (queryParams.genre) {
        const genres = queryParams.genre.split(',').map((g) => g.trim()).filter((g) => g.length > 0);
        if (genres.length > 0) {
            // un paramètre $N par genre demandé : IN ($4, $5, ...)
            const placeholders = genres.map((genre) => {
                values.push(genre);
                return `$${values.length}`;
            });
            genreJoin = `INNER JOIN movie_genres mg ON mg.movie_id = m.id
        INNER JOIN genres g ON g.id = mg.genre_id`;
            conditions.push(`g.name IN (${placeholders.join(', ')})`);
        }
    }

    return { conditions, values, genreJoin };
}

/**
 * Construit la clause ORDER BY à partir des paramètres `sortBy` et `sortOrder`.
 * @param {Object} queryParams paramètres de requête HTTP
 * @returns {string} clause ORDER BY ou une chaîne vide
 */
function buildOrderBy(queryParams) {
    // `m.id` sert de critère de départage : sans lui, deux films ayant la même valeur
    // (ex : deux notes de 9.3) sont retournés dans un ordre arbitraire par PostgreSQL.
    if (!queryParams.sortBy) return 'ORDER BY m.id';
    if (!Object.hasOwn(SORT_FIELDS, queryParams.sortBy)) {
        throw new Error(`Champ de tri invalide : ${queryParams.sortBy}`);
    }
    // la direction n'est jamais reprise telle quelle : seules deux valeurs sont possibles
    const direction = queryParams.sortOrder === 'desc' ? 'DESC' : 'ASC';
    return `ORDER BY ${SORT_FIELDS[queryParams.sortBy]} ${direction}, m.id`;
}

/**
 * Solution complète pour la recherche de films
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
    // 1. Champs à retourner, validés contre la liste blanche
    const fields = resolveFields(queryParams.fields);

    // 2. Conditions du WHERE et valeurs des paramètres préparés
    const { conditions, values, genreJoin } = buildFilters(queryParams);

    // 3. Liste des colonnes. `m.id` est toujours sélectionné pour pouvoir retrouver les genres,
    // mais il ne fait pas partie de la réponse.
    const columns = fields
        .filter((field) => FIELDS[field] !== null)
        .map((field) => `${FIELDS[field]} AS "${field}"`);

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    // les jointures de genres dupliquent un film qui correspond à plusieurs genres demandés :
    // le GROUP BY sur la clé primaire retire ces doublons
    const groupByClause = genreJoin ? 'GROUP BY m.id, d.name' : '';
    const orderByClause = buildOrderBy(queryParams);

    // 4. Exécution de la requête
    const result = await pool.query(`
        SELECT ${['m.id', ...columns].join(', ')}
        FROM movies m
        INNER JOIN directors d ON d.id = m.director_id
        ${genreJoin}
        ${whereClause}
        ${groupByClause}
        ${orderByClause}`, values);

    // 5. Ajout des genres et construction de la réponse avec uniquement les champs demandés
    const genresByMovie = fields.includes('genre') && result.rows.length > 0
        ? await fetchGenres(result.rows.map((row) => row.id))
        : new Map();

    return result.rows.map((row) => {
        const movie = {};
        fields.forEach((field) => {
            movie[field] = field === 'genre' ? (genresByMovie.get(row.id) ?? []) : row[field];
        });
        return movie;
    });
}

module.exports = {
    searchMovies,
    getMovieGenres
};
