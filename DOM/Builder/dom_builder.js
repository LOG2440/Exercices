const schools = [{
    name: 'École Polytechnique de Montréal',
    logo: 'logo_poly.jpg',
    link: 'https://polymtl.ca',
    id: 'polymtl'
},
{
    name: 'École de Technologie Supérieure',
    logo: 'logo_ets.png',
    link: 'https://www.etsmtl.ca',
    id: 'ets'
}, {
    name: 'McGill Faculty of Engineering',
    logo: 'logo_mcgill.png',
    link: 'https://www.mcgill.ca/engineeringa',
    id: 'mcgill'
}, {
    name: 'Gina Cody School of Engineering and Computer Science',
    logo: 'logo_concordia.png',
    link: 'https://www.concordia.ca/ginacody.html',
    id: 'concordia'
},
];

/**
 * @typedef {Object} Props
 * @property {string} id
 * @property {string[]} classes
 * @property {Object.<string,string>} rest
 */

/**
 * @typedef {Object} School établissement de génie
 * @property {string} name nom de l'établissement
 * @property {string} logo lien vers l'image de logo
 * @property {string} link url vers la page principale
 * @property {string} id nom unique
 */

/**
 * Construit un élément HTML avec des propiétés configurables et un nombre variable d'enfants (éléments HTML ou du texte)
 * @param {string} type nom de la balise à construire
 * @param {Props | null} props ensemble de propriétés à ajouter.
 * 
 * Peut contenir un "id", une liste de classes et un objet "rest" qui contient tous les autres attributs à ajouter.
 * Ex : rest : { href:"https://example.com"} ajoute "href":"https://example.com" à l'élément.
 * Peut être null : il n'y a donc aucun attribut à ajouter.
 * 
 * @param { (HTMLElement|string)[]} children ensemble d'éléments HTML ou string à ajouter en tant qu'enfants.
 * 
 * Si un des enfants est de type string, il faut ajouter un noeud texte (TextNode) comme enfant à l'élément
 * @returns Élément HTML construit en fonction des paramètres passés
 */
function createElement(type, props, children) {
    const element = document.createElement(type);
    // TODO : Implémenter la fonction
    element.append(children ? children[0] : []);

    return element;
}

/**
 * Construit l'arbre HTML qui représente une carte d'école avec les informations nécessaires
 * @param {School} school 
 * @returns {HTMLAnchorElement} arbre HTML qui représente une carte d'école dans une balise <a>
 */
function buildSchoolCard(school) {
    // TODO
    const card = createElement('a',
        { id: school.id, classes: ['school-card'], rest: { href: school.link, target: '_blank' } });
    return card;
}

/**
 * 
 * @param {HTMLElement} root élément racie auquel rajouter la grille d'éléments
 * @param {object[]} schools liste d'écoles avec leurs informations
 */
function buildGrid(root, schools) {
    const schoolCards = schools.map(school => buildSchoolCard(school));
    const parent = createElement('div', { id: 'parent-grid' }, [...schoolCards]);
    root.append(parent);
}

const root = document.getElementById("root");
root.innerHTML = '';
const header = createElement('h2', null, ['Liste des écoles et facultés de génie à Montréal']);
root.append(header);

buildGrid(root, schools);