# Exercices sur les tableaux

Les exercices suivants couvrent les notions de base de l'utilisation des fonctions d'itération sur les tableaux JavaScript.

# Exercice 1 : fonction Map

L'exercice est disponible dans le répertoire [custom_map](./custom_map/) et le code à modifier est disponible dans le fichier [custom_map.js](./custom_map/custom_map.js).

Vous devez implémenter la fonction `myMap` qui se comporte comme la fonction `map` native de l'objet `Array`. `myMap` doit être disponible sur n'importe quel objet de type `Array`.

Voici un exemple d'usage de la fonction `map` native :

```js
const arr = [1, 2, 3];
let res = arr.map((val, index, arr) => {
  return { value: val, index: index, array: arr };
});
console.log(res);
/* Valeur attendue :
[ { value: 1, index: 0, array: [ 1, 2, 3 ] }, 
  { value: 2, index: 1, array: [ 1, 2, 3 ] }, 
  { value: 3, index: 2, array: [ 1, 2, 3 ] } ] 
*/
```

## Solution

Une solution est disponible dans le fichier [solution.js](./custom_map/solution.js).


# Exercice 2 : regroupement d'objets

L'exercice est disponible dans le répertoire [grouping](./grouping/) et le code à modifier est disponible dans le fichier [group.js](./grouping/group.js).

Vous devez implémenter une manière de regrouper des objets selon une propriété commune. Dans cet exemple, vous avez un tableau d'objets dont le format est `{name : "X", team: Y}`. Vous devez les regrouper selon selon leur valeur de `team`. 

Le résultat final doit être un tableau dont chaque objet est du format suivant : `{team: Y, members: [A, B, C]}` où `A`, `B`, `C` sont les membres de l'équipe `Y`. Consultez le fichier initial pour un exemple de la valeur attendue en fonction du tableau initial fourni.

Vous devez implémenter ce regroupement en utilisant uniquement des fonctions d'itération des tableaux sans utiliser une boucle `for` classique. Vous pouvez assumer que le numéro d'équipe sera toujours de type `number`.

## Solution

Une solution est disponible dans le fichier [solution.js](./grouping/solution.js). Notez qu'il peut avoir plusieurs solutions possibles valides à cet exercice.

# Exercice 3 : tri à critères multiples

L'exercice est disponible dans le répertoire [multi_sort](./multi_sort/) et le code à modifier est disponible dans le fichier [multi_sort.js](./multi_sort/multi_sort.js).

Vous devez implémenter une manière de trier des objets selon plusieurs critères. Dans cet exemple, vous avec des livres qui ont un prix de type `number` et une disponibilité de type `boolean`. 

Vous devez trier les livres selon leur disponibilité avec les livres disponibles en premier et, par la suite, en ordre croissant de prix. Un livre disponible sera toujours avant un livre non-disponible, même si son prix est plus élevé.

Vous devez implémenter ce tri en utilisant seulement une seule fonction `sort`.  Rappel : la fonction `sort(a,b)` prend une fonction de comparaison qui retourne `-1/1/0` en fonction de la comparaison entre `a` et `b`.

Votre implémentation ne doit pas modifier le tableau `books`. Celui-ci doit être le même avant et après le tri.


## Solution

Une solution est disponible dans le fichier [solution.js](./multi_sort/solution.js). Notez qu'il peut avoir plusieurs solutions possibles valides à cet exercice.