# Gestionnaire de cours et persistance locale

Cet exercice est une continuation de l'exercice [suivant sur l'API Fetch](https://github.com/LOG2440/Exercices/tree/master/Async/Class) et se concentre sur le partie serveur du projet.

Les fonctionnalités du client les mêmes que l'exercice original avec 1 ajout supplémentaire : un utilisateur peut demander la suppression de tous les cours enregistrés sur le serveur à l'aide d'une requête `DELETE /cours/supprimerTout`. 

L'exercice couvre les notions de la gestion des routes de la librairie Express et l'utilisation du mode `fs` pour accéder au système de fichiers. 

Le code source du client vous est fourni dans le fichier [fetch.js](./client/fetch.js). Vous allez utiliser le module `http-server` pour avoir un serveur statique pour votre page web. Vous pouvez lancer le serveur avec la commande `npm start` dans le répertoire `client`.

Le code source initial du serveur dynamique vous est fourni dans le fichier [main.js](./server/main.js) et vous n'avez qu'à lancer le serveur avec la commande `npm start` dans le répertoire `server`.

N'oubliez pas d'installer les dépendances nécessaires avec `npm ci` dans les deux répertoires avant de lancer les serveurs.

## Fonctionnalités à implémenter

### Persistance locale

Contrairement à l'exercice initial, on voudrait mettre en place une persistance de l'information qui reste disponible même si le serveur est redémarré. Pour faire ceci, vous devez récupérer les données des cours du fichier [courses.json](./server/data/courses.json) au lancement du serveur et les charger en mémoire. Si le fichier est vide ou n'existe pas, le serveur devrait initialiser un tableau vide en mémoire.

Le fichier doit être mis à jour à chaque fois que les données sont modifiées : ajout, modification ou supression d'un ou plusieurs cours. *Note* : si vous voulez garder l'indendation du fichier, vous pouvez appeler `JSON.stringify(data, null, 4)` pour indenter le contenu de l'objet `data` de 4 espaces (ou toute autre valeur entière positive).

La nouvelle fonctionnalité de suppression complète devrait également supprimer le fichier `courses.json` du système de fichiers. La liste des cours en mémoire devrait également être réinitialisée.

#### Fichier JSON et Git

Comme `courses.json` est suivi par Git, tout changement du fichier causera un changement pour Git. Si vous voulez revenir à la version initiale du fichier, vous pouvez utiliser la commande `git restore data/courses.json` à partir du répertoire `server`. Ceci fonctionne également pour la suppression du fichier. 

### Gestion du préfixe `/cours`

Dans sa version initiale, toutes les routes du service de gestion de cours ont un préfixe `/cours` dupliqué. Vous devez modifier le code pour retirer cette duplication.

*Astuce* : lorsqu'un projet commencer à grandir, c'est souvent une bonne idée de séparer le code dans plusieurs fichiers. Pensez à construire votre solution avec plus qu'un seul fichier comme le code de départ dans `main.js`.

### Rétrocompatibilité de la solution

Votre mise à jour du serveur ne devrait pas nécessiter des changements au code du client. Le client ne devrait pas savoir que le serveur persiste les données des cours. Vos modifications devraient avoir lieu seulement du côté du serveur dynamique.

# Solution

Une solution possible est disponible dans le répertoire [solution](./server/solution/). Vous pouvez démarrer le serveur dynamique en utilisant le code de la solution avec la commande `npm run solution`. La solution proposée utilise la syntaxe `async`/`await`, mais vous pouvez implémenter l'exercice correctement en utilisant d'autres approches également.