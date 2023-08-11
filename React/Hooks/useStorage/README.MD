# Hooks Reacts personnalisés

Les hooks par défaut de React telles que `useState` et `useEffect` peuvent être combinées pour créer des hooks personnalisés à nos besoins. Ils existent plusieurs librairies comme [useHooks](https://github.com/uidotdev/usehooks) qui contiennent un grand nombre de hooks développés par la communauté.

Vous devez implémenter le hook `useState` qui fait usage du [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage) du navigateur en utilisant `useEffect` et `useState`.

## Installation des dépendances et lancement du projet

Vous pouvez installer les dépendances du projet avec la commande `npm ci`.

Vous pouvez lancer la transpilation et le lancement d'un serveur statique avec la commande `npm start`. Votre page web sera disponibles sur `localhost:3000`.

## Exercice 

Dans cet exercice, vous devez implémenter le hook `useState` qui se comporte de manière similaire à `useState`, mais permet de persister l'état dans le LocalStorage ou SessionStorage, en fonction de la configuration initiale du hook.

La composante principale présente un champ `<textarea>` editable et un compteur dont la valeur initiale est de `1` et peut être incrémenté à travers un bouton. Lorsqu'un de ces 2 éléments est modifié, la valeur est sauvegardée dans le _LocalStorage_ pour le texte ou _SessionStorage_ pour le compteur. Si vous modifiez les 2 éléments, fermez votre navigateur et rouvrez la page à nouveau, le texte devrait persister, mais pas l'état du compteur.

Le bouton `Vider` permet de vider les 2 espaces de stockage. Vous pouvez voir le comportement final voulu en modifiant le module importé dans le fichier [App.jsx](./src/App.jsx) et charger la solution.

Le code à compléter se trouve dans le fichier [useStorage.jsx](./src/useStorage.jsx). Vous n'avez pas à modifier `App.jsx`.

Vous aurez à utiliser la notion des hooks `useState` et `useEffect` de React. 
Rappels : 
- `useState` permet de perdurer l'état d'une ou plusieurs variables à travers les différents rendus d'une composante React. 
- `useEffect` permet de définir un filtre d'activation qui spécifie quand est-ce que l'effet est exécuté.

## Partie 1 : persistance et récupération des données

La signature de `useStorage` est la suivante :
```js
useStorage(key, defaultData, isSession = false){
    ...
    return [data,setData];
}
```
Les paramètres sont les suivants : 
- `key` : clé à utiliser dans l'espace de stockage
- `defaultData`: valeur par défaut pour l'état
- `isSession` : si `true`, l'état est sauvegardé dans _SessionStorage_, sinon dans _LocalStorage_

La fonction retourne la même chose que `useState` : un objet qui représente l'état et une fonction qui permet de modifier cet état.

Vous devez compléter le code pour pouvoir persister des états dans le storage de votre navigateur.
Rappel : les données dans _Storage_ sont toujours sauvegardées en format `string`.

## Partie 2 : réinitialisation des données

Vous devez compléter le code pour ajouter un gestionnaire sur l'événement `storage` dans votre hook. Ce gestionnaire devrait détecter si le storage a été vidé à travers la méthode `clear()` et remettre l'état géré par le hook à sa valeur initiale.

Astuce : consultez la documentation de l'événement [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event) lancé par le bouton dans `App.jsx`.


## Solution

Une solution est disponible dans le fichier [solution.jsx](./src/solution.jsx). Vous pouvez charger la composante de ce fichier dans [App.jsx](./src/App.jsx) en modifiant le module importé dans les 2 premières lignes.