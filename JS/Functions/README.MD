# Exercices sur les fonctions

Les exercices suivants couvrent les notions de base de l'utilisation de fonctions en JavaScript.

Quelques rappels : 
- une fonction JS est un objet et peut être assignée à une variable comme toute autre objet.
- les fonctions fléchées `(x,y,z) => {statement1;statement2}` sont une manière concise d'écrire des fonctions. 


# Exercice #1 : Fermetures et portée des variables

L'exercice est disponible dans le répertoire [team_manager](./team_manager/) et son point d'entrée est le fichier [index.html](./team_manager/index.html). Le code à modifier est disponible dans le fichier [script.js](./team_manager/script.js).

La page permet de charger une liste prédéterminée d'équipes de hockey dans des balises `<li>` à travers un bouton dans la page. Le nom de l'équipe est caché par un texte générique `Team #X` (X étant la position dans la liste initiale) et l'utilisateur doit cliquer sur le texte pour afficher le nom de l'équipe.

Par défaut, toutes les entrées dans la page afficheront le même nom d'équipe. Basé sur le code JS, vous dévez expliquer pourquoi est-ce le cas.

Vous devez modifier le code pour obtenir le comportement désiré, c.à.d `Team #3` devrait être remplacé par `Maple Leafs` (3e élément du tableau `teams`).

Vous devez donner 2 solutions possibles, avec au moins une des solutions utilisant la notion d'IIFE pour résoudre le problème.

## Solution

Deux solutions possibles sont disponibles dans le fichier [solution.js](./team_manager/solution.js). Vous pouvez référer ce fichier en modifiant l'attribut `src` de la balise `<script>` à la ligne 7 d'`index.html`. 

Pour tester les 2 solutions, changez la valeur de la variable `SOLUTION` dans le fichier. En fonction de la solution choisie, un texte différent sera affiché sous la liste des équipes sur la page web.


# Exercice #2 : Fonctions en tant qu'objets et fonctions fléchées

Cet exercice fait appel aux notions de fonctions fléchées et le fait qu'une fonction est un objet JS et peut être assigné comme variable et être retourné par une autre fonction.

L'exercice est disponible dans le fichier [car_factory](./car_factory/car_factory.js). Vous pouvez exécuter l'ensemble du code dans la console de votre navigateur ou à l'aide de `NodeJS` directement dans un terminal.

## Partie 1 : fonction CarFactory

Vous devez compléter l'implémentation de la fonction `CarFactory`. Cette fonction permet de créer une usine de voiture pour une marque spéciale (paramètre de la fonction). Cette usine contient un compteur de voitures construites qui commence à 0 et est incrémenté à chaque nouvelle voiture créée.

La fonction retourne un objet avec 2 méthodes sous la forme de fonctions fléchées : 
- `carsBuilt` qui retourne le nombre de voiture créées par l'usine.
- `carBuilder` qui retourne une fonction qui prend en paramètre un modèle spécifique et qui retourne une autre fonction qui prend en paramètre une année et retourne un objet de voiture (voir la signature de `Car` plus bas).

Signature d'un objet de voiture `Car` :
```js
{
    make: string;
    model: string;
    year: number;
    info: () => string;
}
```

La méthode `info` retourne l'information de la voiture dans le format suivant : `make model : year`. 

### Exemple d'utilisation

Voici un exemple d'utilisation de `CarFactory` et les valeurs d'affichage attendues

```js
const fordFactory = CarFactory('Ford');
console.log(fordFactory.carsBuilt()); // 0

const mustangBuilder = fordFactory.carBuilder('Mustang');
const mustang = mustangBuilder(1970);
console.log(mustang.info()); // Ford Mustant : 1970
console.log(fordFactory.carsBuilt()); // 1

const focusBuilder = fordFactory.carBuilder('Focus');
const focus = focusBuilder(2019);
console.log(focus.info()); // Ford Focus : 2019
console.log(fordFactory.carsBuilt()); //2
```

## Partie 2 : fonction CarUpgrader

La fonction `CarUpgrader(car, newYear)` fournie permet de modifier l'année d'un objet voiture et retourner cet objet.

Si vous exécutez le code suivant, vous obtenez l'affichage suivant :
```js
const newFordFocus = CarUpgrader(focus, 2023);
console.log(newFordFocus.year); // 2023
console.log(newFordFocus.info()); // Ford Focus : 2019
```

Expliquez pourquoi est-ce qu'il y a une différence entre l'affichage des 2 `console.log` et proposez une solution pour avoir la même information. Assumez que `Ford Focus : 2023` est l'affichage correct attendu.


## Solution

La solution de l'exercice est disponible dans le fichier [solution.js](./car_factory/solution.js).

Notez qu'il a plus qu'une solution possible pour la 2e partie de l'exercice et la solution peut dépendre de votre implémention de la 1re partie de l'exercice.