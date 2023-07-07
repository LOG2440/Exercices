const teams = [
    "Habs",
    "Lightning",
    "Maple Leafs",
    "Golden Knights",
    "Penguins"];

// Changer pour 1 ou 2
const SOLUTION = 1;


/// Solution #1
if (SOLUTION === 1) {
    document.body.appendChild(document.createTextNode("Solution utilisant let"));

    function loadTeams() {
        const listItems = document.getElementsByClassName("team");
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener("click", (e) => {
                e.target.textContent = teams[i];
            });
        }
        document.getElementById("team-loader").disabled = true;
    }
}

else {
    document.body.appendChild(document.createTextNode("Solution utilisant IIFE"));

    function loadTeams() {
        const listItems = document.getElementsByClassName("team");
        for (var i = 0; i < listItems.length; i++) {
            (function (newI) {
                listItems[newI].addEventListener("click", (e) => {
                    e.target.textContent = teams[newI];
                });
            })(i);
        }
        document.getElementById("team-loader").disabled = true;
    }
    /// Comme les paramètres sont passés par valeur, newI existe seulement dans l'IIFE
}