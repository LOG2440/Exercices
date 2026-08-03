# Gestionnaire de cours et persistance avec PostgreSQL

Cet exercice est une continuation de l'exercice [suivant sur les serveurs dynamiques](https://github.com/LOG2440/Exercices/tree/master/Server/Class) et se concentre sur le partie persistance des données.

Les fonctionnalités existantes sont les mêmes que l'exercice original. Le code source est majoritairement le même, sauf quelques ajouts mineurs du côté serveur dynamique, mais les fonctionnalités principales sont pareilles.

L'exercice couvre les notions de l'utilisation d'un système de gestion de base de données relationnelle, plus spécifiquement `PostgreSQL`, et la persistance des données dans des tables reliées entre elles.

Le code source du client vous est fourni dans le fichier [fetch.js](./client/fetch.js). Vous allez utiliser le module `http-server` pour avoir un serveur statique pour votre page web. Vous pouvez lancer le serveur avec la commande `npm start` dans le répertoire `client`.

Le code source initial du serveur dynamique vous est fourni dans le fichier [main.js](./server/src/main.js) et vous n'avez qu'à lancer le serveur avec la commande `npm start` dans le répertoire `server`.

N'oubliez pas d'installer les dépendances nécessaires avec `npm ci` dans les deux répertoires avant de lancer les serveurs.

## Fonctionnalités à implémenter

### Persistance dans une base de données

Contrairement à l'exercice initial, on voudrait mettre en place une persistance de l'information qui ne dépend pas d'un fichier local sur la machine du serveur. On veut également pouvoir représenter une deuxième entité, les professeurs, et la relation entre un cours et son professeur.

Vous devez transférer la persistance locale dans un fichier JSON à une persistance dans une base de données `PostgreSQL`.

### Configuration de la base de données

Avant de commencer l'exercice, assurez-vous d'avoir une instance de PostgreSQL configurée et une base de données créée pour l'exercice.

Le fichier [env.js](./server/src/env.js) vous permettra de configurer les informations de connexion (utilisateur, hôte, nom de la base, mot de passe et port). Ces valeurs peuvent aussi être définies à travers des variables d'environnement.

Le schéma des tables et les données par défaut se trouvent dans le fichier [postgres.sql](./server/db/postgres.sql). Vous pouvez exécuter ce script avec la commande `npm run seed` dans le répertoire `server`. La commande supprime les tables existantes, les recrée et insère les valeurs par défaut : vous pouvez la relancer à tout moment pour repartir d'un état connu.

### Schéma des tables

Les données sont séparées dans deux tables :

**`teachers`**

| Colonne | Type et contraintes |
| --- | --- |
| `id` | `SERIAL PRIMARY KEY` |
| `name` | `VARCHAR(100) NOT NULL` |
| `email` | `VARCHAR(255) NOT NULL UNIQUE` |

**`courses`**

| Colonne | Type et contraintes |
| --- | --- |
| `id` | `SERIAL PRIMARY KEY` |
| `sigle` | `VARCHAR(10) NOT NULL UNIQUE` |
| `credits` | `INTEGER NOT NULL` |
| `teacher_id` | `INTEGER REFERENCES teachers(id) ON DELETE SET NULL` |

La colonne `courses.teacher_id` accepte la valeur `NULL` : un cours peut exister sans professeur assigné, ce qui est le cas des cours créés par la route `POST /cours` qui ne reçoit qu'un `sigle`.

### Rétrocompatibilité des routes existantes

Votre mise à jour ne devrait pas changer le comportement des routes existantes. Le client ne devrait pas savoir de quelle façon le serveur persiste les données : les routes doivent continuer à retourner des objets ayant les champs `sigle` et `credits`.

### Nouvelles routes à implémenter

Le client a été mis à jour pour afficher les professeurs et permettre de les gérer. Les routes liées aux professeurs sont regroupées dans un routeur distinct, [profRouter.js](./server/src/profRouter.js), utilisant le préfixe `/prof`. Vous devez implémenter les routes suivantes, dont les gestionnaires vous sont déjà fournis :

| Route | Description | Retour |
| --- | --- | --- |
| `GET /prof/cours` | Tous les cours avec le nom de leur professeur | `[{ sigle, credits, professeur }]`, `professeur` à `null` si le cours n'en a pas |
| `GET /prof` | Tous les professeurs avec leur nombre de cours | `[{ id, name, email, nb_cours }]` |
| `PATCH /prof` | Assigne un professeur à un cours | `true` si le cours a été modifié |
| `DELETE /prof/:id` | Supprime un professeur | `true` si le professeur a été supprimé |

Vous ne devriez avoir à modifier que le fichier [courseManager.js](./server/src/courseManager.js) pour compléter l'exercice : les quatre méthodes correspondantes s'y trouvent déjà avec une valeur de retour vide.

Veuillez prendre note des éléments suivants :

- Chaque rangée a une colonne `id` qui ne devrait pas être envoyée au client pour les cours. Pensez à expliciter les colonnes de vos requêtes au lieu d'utiliser `SELECT *`.
- Le système ne permet pas l'ajout d'un cours s'il existe déjà une rangée avec le même `sigle`. C'est la contrainte `UNIQUE` de la colonne qui garantit cette propriété.
- Les requêtes d'ajout / modification / suppression retournent un objet qui contient le nombre de rangées affectées dans sa propriété `rowCount`. Ceci permet de savoir si l'action a eu un effet ou non sur la table. La clause `RETURNING` permet en plus de récupérer les rangées modifiées sans faire une deuxième requête.
- La fonction `COUNT()` retourne un `BIGINT`, que le pilote `pg` convertit en chaîne de caractères et non en nombre. Un `CAST` (`::INTEGER`) dans la requête règle le problème.
- Un cours sans professeur a la valeur `NULL` dans sa colonne `teacher_id`.
- Les méthodes d'accès à la base sont asynchrones et leurs valeurs de retour sont englobées dans un objet `Promise`.

# Solution

Une solution possible est disponible dans le fichier [courseManager.solution.js](./server/src/courseManager.solution.js). Vous pouvez démarrer le serveur dynamique en utilisant le code de la solution en modifiant la source de la classe `CourseManager` aux lignes 1 et 2 de [courseManagerInstance.js](./server/src/courseManagerInstance.js), le module qui crée l'instance unique partagée par les deux routeurs. Par défaut, la version basée sur `fs` est utilisée.

La solution proposée utilise la syntaxe `async`/`await`, mais vous pouvez implémenter l'exercice correctement en utilisant d'autres approches également.
