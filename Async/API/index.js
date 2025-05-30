let currentPage = 0;

/**
 * TODO : Récupérer les jeux vidéo en rabais de la plateforme Steam à l'aide de l'API CheapShark (20 à la fois)
 * Afficher les résultats dans la page.
 * - Suivre le format présenté dans le fichier index.html pour chaque vignette de jeu.
 * @param {number} pageIndex - L'index de la page à récupérer, par défaut 0.
 * @returns {Promise<void>} rien
 */
async function fetchGames(pageIndex = 0) {

}

// TODO : Récupérer les jeux vidéo en rabais de la page 0
const loadGamesButton = document.getElementById('loadButton');

// TODO : Récuprer les prochains 20 jeux vidéo en rabais et activer le bouton "Previous Page"
const nextPageButton = document.getElementById('nextPage');

// TODO : Récupérer les 20 jeux vidéo précédents et désactiver le bouton "Previous Page" si on est à la première page
const prevPageButton = document.getElementById('prevPage');