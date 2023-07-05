# Exercices sur les fonctions

Les exercices suivants couvrent les notions de base de l'utilisation des objets en JS ainsi que l'objet spécial _this_.

Quelques rappels : 
- un objet JS est un conteneur de propriétés.
- un objet peut avoir 1 seul prototype à la fois, mais une chaîne de prototypes aussi longues qu'on veut.
- la notation _class_ se base sur la notion des prototypes.


# Exercice #1 : Objet _this_ et son contexte

L'exercice est disponible dans le répertoire [button_handler](./button_handler/) et son point d'entrée est le fichier [index.html](./button_handler/index.html). Le code à modifier est disponible dans le fichier [script.js](./button_handler/script.js).

### Partie 1
La page permet d'obtenir un chiffre aléatoire entre 1 et 10 en cliquant sur un bouton et l'afficher à l'écran.

Par défaut, ce comportement ne fonctionne pas et une erreur est lancée dans la console. Vous verrez que l'erreur est en lien avec l'appel de la méthode `this.getRandom`.

En vous basant sur l'erreur lancée, vous devez modifier le code de `ButtonHandler` pour corriger le problème. Vous devez donner 2 solutions possibles.

### Partie 2 

Modifiez le code fourni pour que la fonction qui génère la valeur aléatoire ne soit pas sur l'objet `ButtonHandler`, mais est plutôt passée en paramètre à la fonction `addHandler`. Voici un exemple où on génère une lettre aléatoire entre A et Z :

```js
const getRandom = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
const button = document.getElementById("btn");
ButtonHandler.addHandler(button, getRandom);
```

Rappel : le 2e paramètre de la fonction `addEventListener` doit être une fonction.

## Solution

Deux solutions possibles sont disponibles dans le fichier [solution.js](./button_handler/solution.js). Vous pouvez référer ce fichier en modifiant l'attribut `src` de la balise `<script>` à la ligne 7 d'`index.html`. 

La solution de la partie 2 est disponible dans le ficiher [solution2.js](./button_handler/solution2.js). Vous pouvez référer ce fichier en modifiant l'attribut `src` de la balise `<script>` à la ligne 7 d'`index.html`. 


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