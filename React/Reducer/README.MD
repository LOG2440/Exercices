# Reducer

Cet exercice se base sur le code du cours disponible [ici](https://github.com/LOG2440/Cours-12-React/tree/master/reducer) et explore la notion de fonction _reducer_.

_Rappel_ : une fonction _reducer_ est une fonction qui prend 2 paramètres : _state_ et _action_ et retourne un _state_ modifié.

```js
let counter = { 
    name: "Timer", 
    count: 0, 
    maxValue: 10 
};
const incrementAction = { 
    type: ACTIONS.INCREMENT, 
    payload: 1 
};
counter = reducer(counter, incrementAction);
```

## Exercice

Vous devez modifier la fonction _reducer_ fournie pour ajouter les fonctionnalités suivantes :

- Ajouter l'attribut _maxValue_ dans l'état. Cet attribut est configuré à la création du compteur et représente la valeur maximale que votre compteur peut prendre lorsqu'il est incrémenté.
- Borner les valeurs de _count_ à [0,_maxValue_]. Lorsqu'une action `INCREMENT` ou `DECREMENT` valide est envoyé au _reducer_, _count_ est modifiée, mais ne peut pas dépasser les bornes configurées.
- Ajouter une nouvelle action `RENAME`. Cette action change le nom (_name_) du compteur seulement si le nouveau nom n'est pas vide et contient 10 caractères ou moins. Si ces conditions ne sont pas respectées, le nom du compteur reste le même.

Le code fourni dans [reducer.js](./reducer.js) présente une séquence d'actions envoyées ainsi que le résultat attendu. Si votre implémentation est bien faite, vous devez avoir la même sortie à la console que le résultat attendu.

## Exécution du code

Vous n'avez pas besoin de librairies ou code externe pour exécuter le code de l'exercice. Vous pouvez exécuter le code directement dans un terminal avec `node reducer.js`.

## Solution

Une solution possible est disponible dans [solution.js](./solution.js). Vous pouvez exécuter le code directement dans un terminal avec `node solution.js`. Notez qu'il peut avoir plusieurs manières d'implémenter la nouvelle action `RENAME` qui produisent le même comportement final. 