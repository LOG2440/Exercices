# Développement piloté par les tests

Le développement piloté par les tests  (_Test Driven Development(TDD)_) est une approche de développement où les tests sont écrits en premier et le code qui implémente la logique testée est fait par la suite.

## Mise en situation

Vous gérez le serveur d'un site de commerce qui permet aux utilisateurs de laisser une note (étoiles) de 1 à 5 aux produits. Les utilisateurs peuvent donner une note sous leur nom ou de manière anonyme (la valeur de l'attribut `author` est `null`).

Vous voulez pouvoir calculer des statistiques, à des fins de suivi, sur la moyenne des notes données à un produit. Pour chaque produit, vous voulez avoir les 3 moyennes suivantes : moyenne avec auteur, moyenne anonyme et moyenne globale. Dans le cas où il n'y a aucune note pour calculer une ou plusieurs moyennes, la valeur de la moyenne est `NaN`.

Voici un exemple basé sur les notes données dans le fichier [utils.js](./tests/utils.js) :

```js
[
    { author: null, stars: 3 },
    { author: "Jean", stars: 5 }, 
    { author: null, stars: 1 }, 
    { author: "Marie", stars: 3 },
    { author: "Paul", stars: 4 },
    { author: null, stars: 2 }
];
```
Ces notes devraient donner les moyennes suivantes : 
- avec auteur : 4
- sans auteur : 2
- globale : 3

### Tests unitaires

Le fichier [scoreCalculator.test.js](./tests/scoreCalculator.test.js) contient les tests unitaires pour les différentes fonctions de la classe `ScoreCalculator` du fichier [scoreCalcultor.js](./src/scoreCalculator.js).

Vous devez compléter la classe `ScoreCalculator` et ses fonctions en fonction des tests fournis.

Lisez bien les tests fournis pour mieux comprendre le fonctionnement des différentes fonctions ainsi que les liens entre elles. Vous pouvez assumer que la classe n'a aucune dépendance externe.

## Installation des librairies de tests

Les dépendances nécessaires sont définies dans le fichier [package.json](./package.json). Vous pouvez utiliser la commande `npm ci` pour installer la version exacte de la librairie utilisée pour la solution.

## Exécution des tests

Vous pouvez vérifier votre code avec les commandes `npm run test` et `npm run coverage` qui vont exécuter les tests sur votre code et, dans le cas de la 2e commande, calculer le taux de couverture.

**Important** : une couverture de 100% n'est pas un garant de code complété. Assurez-vous que tous les tests fournis réussissent.

# Solution

Une solution est disponible dans le fichier [solution.js](./src/solution.js). Notez qu'il peut avoir plus qu'une manière d'implémenter correctement l'exercice et réussir tous les tests fournis. La solution fournie se base sur une méthode d'itération spécifique, mais vous pouvez implémenter une solution en utilisation d'autres fonctions de l'objet `Array`.


## Exercice supplémentaire

*Note : cet exercice ne demande pas d'implémentation, mais plutôt un travail de reflexion. La réponse est disponible dans le fichier [solution.js](./src/solution.js).*

Voici un extrait du code HTML du formulaire qui permet de laisser une note sur la page web du produit :

```html
<input id="stars" type="number" min=0 max=5>
```

Votre collègue pense qu'il peut avoir un problème potentiel avec le système de calcul des moyennes sur le serveur. Quel est ce problème et comment est-ce qu'il pourrait être détecté ?
