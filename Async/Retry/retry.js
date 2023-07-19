const parent = document.getElementById("parent");

/**
 * Ajoute du texte dans une balise `<li>` à l'écran
 * @param {string} text texte à ajouter dans une balise `<li>` à l'élément parent 
 */
function addToList(text) {
    const liElement = document.createElement("li");
    liElement.textContent = text;
    parent.append(liElement);
}

/**
 * Essaie d'appeler la fonction promiseFn un maximum de maxRetries fois.
 * 
 * Si la promesse retournée par promiseFn résolue, on retourne sa réponse.
 *  
 * Si la promesse retournée par promiseFn échoue, on vérifie si on peut essayer encore après `X = 100*(2^nbTentatives)` ms
 * et on ajoute le message "Nouvelle tentative après ${X} ms" sur la page. 
 * 
 * Si on on a atteint maxRetries, on rejète avec le message d'erreur de promiseFn.
 * 
 * @param {()=>Promise<string>} promiseFn fonction a appeler. Retourne un objet Promise<string>
 * @param {number} maxRetries nombre maximal de fois à réessayer d'appeler promiseFn
 * @returns {Promise<string>} le résultat de promiseFn
 */
function retryWithBackoff(promiseFn, maxRetries) {
    return Promise.resolve(`TODO: implémenter ${arguments.callee.name}`);
}

// Simulation d'appel à un serveur
const fetchData = () => {
    const chance = (document.getElementById("sucess").value) / 100;
    return new Promise((resolve, reject) => {
        // On simule un appel au serveur qui a ${chance}% de chances de réussir
        const randomNum = Math.random();
        if (randomNum < chance) {
            resolve(`Voici une valeur aléatoire : ${randomNum.toFixed(2)}`);
        } else {
            reject('Erreur: échec de récupération');
        }
    });
};


document.getElementById("send-server").addEventListener('click', () => {
    parent.innerHTML = '';
    // On essaie jusqu'à 4 fois et on affiche le résultat à la fin
    retryWithBackoff(fetchData, 4)
        .then((data) => {
            addToList(data);
        })
        .catch((error) => {
            addToList(error);
        });
});