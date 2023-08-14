# Pagination et déroulement infini

Une fonctionnalité très populaire dans le Web est l'utilisation de pages _infinies_, c'est-à-dire des pages dont du contenu supplémentaire est chargé lorsqu'on arrive à la fin de la page. Par exemple, des sites comme Facebook, YouTube ou Reddit.       

Ce chargement est souvent combiné à la notion de pagination : le nouveau contenu est chargé en bloc (page) d'un coup. Par exemple, le chargement de 10 nouvelles vidéos YouTube lorsqu'on arrive à la fin de la page.

## Installation des dépendances et lancement du projet

Vous pouvez installer les dépendances du projet avec la commande `npm ci`.

Vous pouvez lancer la transpilation et le lancement d'un serveur statique avec la commande `npm start`. Votre page web sera disponibles sur `localhost:3000`.

## Exercice 

Dans cet exercice, vous devez implémenter le même comportement dans une page web où des nouveaux messages sont chargés lorsque vous arrivez à la fin de la page. Vous pouvez voir le comportement voulu en modifiant le module importé dans le fichier [App.jsx](./src/App.jsx) et charger la solution.

Le code à compléter se trouve dans le fichier [InfiniteScroll.jsx](./src/InfiniteScroll.jsx).
La logique de détection de fin de page vous est déjà fournie et la fonction `fetchData` simule un appel à un serveur externe qui fournit les messages à afficher.

Vous aurez à utiliser la notion des hooks `useState` et `useEffect` de React. 
Rappels : 
- `useState` permet de perdurer l'état d'une ou plusieurs variables à travers les différents rendus d'une composante React. 
- `useEffect` permet de définir un filtre d'activation qui spécifie quand est-ce que l'effet est exécuté.

## Partie 1 : chargement des données et affichage dans la page

Vous devez compléter le code de la composante `InfiniteScroll` pour mettre à jour l'état `messages` avec les nouvelles valeurs récupérées. Vous devez également modifier le HTML final pour afficher les messages dans une composante [Card](./src/Card.jsx). Un exemple de rendu est disponible dans le code initial.

## Partie 2 : chargement infini

Vous devez compléter le code pour ajouter un gestionnaire sur l'événement `scroll` de la fenêtre. Le gestionnaire doit s'exécuter une seule fois par événement `scroll`.

Vous devez compléter le code pour récupérer 10 nouveaux messages avec `fetchData` à chaque fois que vous arrivez à l'affichage de la fin de la page. Astuce : la variable `page` est incrémentée de 1 à chaque fois que le code détecte la fin de la page. Il ne doit pas avoir une autre manière de déclencher la récupération des messages.

## Solution

Une solution est disponible dans le fichier [Solution.jsx](./src/Solution.jsx). Vous pouvez charger la composante de ce fichier dans [App.jsx](./src/App.jsx) en modifiant le module importé dans les 2 premières lignes.