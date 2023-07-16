/**
 * Modifie les variables CSS globales utilisées pour le thème visuel de certains éléments
 * @param {{textColor:string, borderColor:string, backgroundColor:string}} theme couleurs du thème visuel du site
 * 
 * Contient 3 couleurs : texte, bordure et arrière-plan
 */
export default function loadTheme(theme) {
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--border-color', theme.borderColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
}