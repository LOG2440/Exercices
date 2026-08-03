# Exercices sur la persistance des données avec PostgreSQL

Ce dossier contient des exercices sur les notions de persistance des données et la base de données relationnelle `PostgreSQL`.

Chaque dossier contient un fichier `README` avec l'objectif de l'exercice ainsi qu'une solution possible.

Vous êtes fortement encouragés d'essayer de compléter l'exercice par vous-mêmes avant de regarder la solution, mais vous pouvez à tout temps consulter la solution finale pour mieux comprendre le fonctionnement des différentes notions.

La documentation du [pilote de NodeJS `pg`](https://node-postgres.com/) et celle de [PostgreSQL](https://www.postgresql.org/docs/current/sql-commands.html) vous seront également utiles pour les exercices.

Les deux exercices ont besoin d'une instance PostgreSQL et d'une base de données créée à l'avance. Les informations de connexion se configurent dans le fichier `env.js` de chaque serveur, et la commande `npm run seed` crée les tables et insère les données par défaut.

## Table des matières

Voici les liens vers les différents exercices et leurs énoncés. Vous êtes conseillés de comencer par l'exercice d'introduction :

- [`Class`](./Class/README.MD) : exercice d'évolution d'un système existant pour migrer d'un fichier local vers une base de données relationnelle avec deux tables liées.
- [`Movies`](./Movies/README.MD) : exercice sur les requêtes SQL complexes avec filtres, jointures, sélection des colonnes, tri et combinaison de plusieurs critères.
