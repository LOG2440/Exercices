# Gestionnaire de cours et persistance à distance

Cet exercice est une continuation de l'exercice [suivant sur les serveurs dynamiques](https://github.com/LOG2440/Exercices/tree/master/Server/Class) et se concentre sur le partie persistance des données.

Les fonctionnalités sont les mêmes que l'exercice original. Le code source est majoritairement le même, sauf quelques ajouts mineurs du côté serveur dynamique, mais les fonctionnalités principales sont pareilles.

L'exercice couvre les notions de l'utilisation d'un système de gestion de base de données, plus spécifiquement `MongoDB` et la persistance des données à distance.

Le code source du client vous est fourni dans le fichier [fetch.js](./client/fetch.js). Vous allez utiliser le module `http-server` pour avoir un serveur statique pour votre page web. Vous pouvez lancer le serveur avec la commande `npm start` dans le répertoire `client`.

Le code source initial du serveur dynamique vous est fourni dans le fichier [main.js](./server/src/main.js) et vous n'avez qu'à lancer le serveur avec la commande `npm start` dans le répertoire `server`.

N'oubliez pas d'installer les dépendances nécessaires avec `npm ci` dans les deux répertoires avant de lancer les serveurs.

## Fonctionnalités à implémenter

### Persistance à distance

Contrairement à l'exercice initial, on voudrait mettre en place une persistance de l'information qui reste disponible même si le serveur est déployé sur une autre machine. La persistance a alors lieu à distance, accessible par n'importe quelle machine.

Vous devez transférer la persistance locale dans un fichier JSON à une persistance à distance sur MongoDB. Vous n'avez pas à implémenter des nouveaux gestionnaires de routes pour cet exercice.

#### Configuration de la base de données

Avant de commencer l'exercice, assurez-vous d'avoir configuré une instance de MongoDB. Vous pouvez vous référer à la [documentation du cours](https://github.com/LOG2440/Cours-11-MongoDB/blob/master/README.MD#configuration-dinstances-mongodb-avec-cloud-atlas) pour configurer une instance sur le service `MongoDB Cloud`. Vous pouvez également utiliser une instance locale sur votre machine.

Le fichier [env.js](./server/src/env.js) vous permettra de configurer les informations nécessaires de votre instance MongoDB. Assurez-vous de remplir les bonnes informations pour pouvoir vous connecter à votre base de données.

Le fichier [courses.json](./server/data/courses.json) contient les valeurs par défaut utilisées par les exercices précédants. Vous pouvez ajouter ces objets dans votre collection Mongo pour avoir des valeurs par défaut. Cette étape est optionnelle : vous pouvez commencer avec une collection vide et la remplir à travers les appels à `POST /cours/ajouterCours`.

### Rétrocompatibilité de la solution

Votre mise à jour du serveur ne devrait pas nécessiter des changements au code du client. Le client ne devrait pas savoir que le serveur persiste les données sur une base de données. Vos modifications devraient avoir lieu seulement du côté du serveur dynamique et vous ne devriez avoir à modifier que le fichier [courseManager.js](./server/src/courseManager.js) pour compléter l'exercice.

Veuillez prendre note des éléments suivants :
- Chaque document dans MongoDB a un champs obligatoire `_id`. Celui-ci ne devrait pas être envoyé aux clients. Pensez à comment modifier les objets transmis pour avoir les mêmes champs que l'exercice original : `sigle` et `credits`.
- Le système ne permet pas l'ajout d'un cours s'il existe déjà un document avec le même `sigle`. Il y a plusieurs manières d'implémenter cette fonctionnalité, mais vous pouvez utiliser la notion des `index` avec contraintes. Par exemple, l'index suivant assure que le champs `abc` est unique dans une collection :
   ```js
   collection.createIndex("abc", { unique: true });
   ```
- Les méthodes d'ajout / modification / suppression des éléments d'une collection retournent toujours un objet qui contient le nombre d'éléments affectés. Ceci permet de savoir si l'action a eu un effet ou non sur la collection. Voir la documentation sur [la valeur de retour de `deleteOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/#definition) pour un exemple. 
- Les méthodes d'accès à la base sont asynchrones et leurs valeurs de retour sont englobés dans un objet `Promise`.

# Solution

Une solution possible est disponible dans le fichier [courseManager.solution.js](./server/src/courseManager.solution.js). Vous pouvez démarrer le serveur dynamique en utilisant le code de la solution en modifiant la source de la classe `CourseManager` aux lignes 2 et 3 de [courseRouter.js](./server/src/courseRouter.js). Par défaut, la version basé sur `fs` est utilisée.

La solution proposée utilise la syntaxe `async`/`await`, mais vous pouvez implémenter l'exercice correctement en utilisant d'autres approches également.