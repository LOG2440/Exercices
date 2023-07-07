# Partie 1
La page permet d'obtenir un chiffre aléatoire entre 1 et 10 en cliquant sur un bouton et l'afficher à l'écran.

Par défaut, ce comportement ne fonctionne pas et une erreur est lancée dans la console. Vous verrez que l'erreur est en lien avec l'appel de la méthode `this.getRandom`.

En vous basant sur l'erreur lancée, vous devez modifier le code de `ButtonHandler` pour corriger le problème. Vous devez donner 2 solutions possibles.

# Partie 2 

Modifiez le code fourni pour que la fonction qui génère la valeur aléatoire ne soit pas sur l'objet `ButtonHandler`, mais est plutôt passée en paramètre à la fonction `addHandler`. Voici un exemple où on génère une lettre aléatoire entre A et Z :

```js
const getRandom = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
const button = document.getElementById("btn");
ButtonHandler.addHandler(button, getRandom);
```

Rappel : le 2e paramètre de la fonction `addEventListener` doit être une fonction.

# Solution

Deux solutions possibles sont disponibles dans le fichier [solution.js](./button_handler/solution.js). Vous pouvez référer ce fichier en modifiant l'attribut `src` de la balise `<script>` à la ligne 7 d'`index.html`. 

La solution de la partie 2 est disponible dans le ficiher [solution2.js](./button_handler/solution2.js). Vous pouvez référer ce fichier en modifiant l'attribut `src` de la balise `<script>` à la ligne 7 d'`index.html`. 