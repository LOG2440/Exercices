# Moteur de recherche de films avec PostgreSQL

Cet exercice se concentre sur l'implémentation de requêtes SQL complexes combinant filtres, jointures, sélection de colonnes, tri et une combinaison de plusieurs critères.

L'exercice couvre les notions de base des requêtes PostgreSQL avec le pilote NodeJS `pg`, en particulier la construction dynamique et **sécuritaire** de requêtes, l'utilisation des opérateurs de comparaison et logiques, les jointures entre plusieurs tables, ainsi que la manipulation des colonnes retournées et du tri.

Le code source initial du serveur vous est fourni dans le répertoire `server`. Vous devez lancer le serveur avec la commande `npm start` dans le répertoire `server`.

N'oubliez pas d'installer les dépendances nécessaires avec `npm ci` avant de lancer le serveur.

## Objectif de l'exercice

L'objectif principal est d'implémenter la fonction `searchMovies` dans le fichier [movieManager.js](./server/src/movieManager.js) qui permettra de :

1. **Extraire et valider les paramètres de requête** pour construire des filtres dynamiques.
2. **Construire des conditions dynamiques** dans la clause `WHERE` basées sur les paramètres de requête.
3. **Joindre les tables** pour retrouver le réalisateur et les genres de chaque film.
4. **Contrôler les colonnes retournées** et **implémenter le tri** sur différents critères.
5. **Combiner tous ces éléments** dans une seule requête SQL, sans jamais concaténer une valeur reçue du client.

## Structure des données

Les données sont réparties dans quatre tables. Le schéma et les données se trouvent dans le fichier [postgres.sql](./server/db/postgres.sql), généré à partir de la banque de données d'origine [movies.json](./server/data/movies.json).

Un film a plusieurs genres et un genre est partagé par plusieurs films : cette relation *plusieurs-à-plusieurs* ne peut pas être représentée par une colonne et demande une table d'association : **movie_genres**. Sa clé primaire est composée des deux colonnes, ce qui empêche d'insérer deux fois la même paire.

La réponse envoyée au client garde par contre la forme d'un seul objet par film, avec le nom du réalisateur et la liste de ses genres :

```javascript
{
  title: "The Matrix",
  year: 1999,
  genre: ["Action", "Sci-Fi"],
  director: "Wachowski Sisters",
  country: "USA",
  language: "English",
  runtime: 136, // en minutes
  imdbRating: 8.7,
  budget: 63000000,
  boxOffice: 467222824,
  releaseDate: "1999-03-31T00:00:00.000Z", // format ISO 8601
}
```

Les tables sont supprimées, recréées et remplies à chaque lancement du serveur. La commande `npm run seed` permet de faire la même chose sans lancer le serveur.

## Travail à compléter

### GET /movies/search

Cette route unique est le point d'entrée pour la recherche de films. Elle permet d'appliquer un ensemble de paramètres de recherche et retourner le résultat trouvé dans la base de données. Tous les paramètres sont optionnels et se trouvent dans l'URI. La route doit supporter les paramètres de requête suivants :

**Paramètres de filtrage :**
- `year` - Année exacte (a priorité sur les plages d'années)
- `yearFrom` & `yearTo` - Plage d'années
- `genre` - Liste de genres (OU logique) séparés par des virgules (par exemple `genre=Action,Sci-Fi`)
- `director` - Recherche partielle dans le nom du réalisateur (par exemple `director=Nolan` pour `Christopher Nolan`)
- `country` - Pays exact
- `language` - Langue exacte
- `minRating` & `maxRating` - Plage de note IMDB
- `minRuntime` & `maxRuntime` - Plage de durée
- `minBudget` & `maxBudget` - Plage de budget

**Paramètres de tri :**
- `sortBy` - Champ de tri (year, imdbRating, runtime, boxOffice, title)
- `sortOrder` - Ordre de tri (`asc` ou `desc`)

**Paramètres de sortie :**
- `fields` - Liste de champs à inclure/exclure (séparés par des virgules). Un champ à exclure doit commencer par un tiret (`-`), par exemple `fields=-budget,-boxOffice`.

### GET /movies/:id/genres

Cette route est déjà implémentée dans [movieRouter.js](./server/src/movieRouter.js) et retourne la liste des genres d'un seul film, par exemple `["Action", "Sci-Fi"]` pour `/movies/1/genres`. Un identifiant invalide (non numérique) retourne une erreur `400`; un identifiant qui ne correspond à aucun film retourne un tableau vide.

## Exemples de requêtes

Voici quelques exemples de requêtes que vous pouvez implémenter :

```bash
# Films avec note minimale de 9 du Japon datant de l'année 2001
GET /movies/search?minRating=9.0&country=Japan&year=2001

# Films du directeur Nolan avec un budget minimum de 162.5 millions, triés par box office décroissant et seulement titre, budget et box office retournés
GET /movies/search?director=Nolan&minBudget=162500000&sortBy=boxOffice&sortOrder=desc&fields=title,budget,boxOffice
```

Le fichier [TESTS.md](./server/TESTS.md) contient plus d'exemples de requêtes pour tester votre implémentation avec les réponses attendues. Vous pouvez les exécuter dans un terminal ou un outil comme Postman ou ThunderClient.

Pour vous aider, un middleware affiche le contenu de l'objet `query` dans la console du serveur pour chaque requête reçue avant de lancer la recherche.

## Configuration de la base de données

Avant de commencer l'exercice, assurez-vous d'avoir une instance de PostgreSQL configurée et une base de données créée pour l'exercice. Le fichier [env.js](./server/src/env.js) vous permettra de configurer les informations de connexion.

## Fonctionnalités à implémenter

### Construction de conditions dynamiques

Vous devez implémenter la logique qui construit la clause `WHERE` de la requête à partir des paramètres reçus. Voici quelques astuces :

- **Filtres de plage** : utiliser `>=` et `<=`, ou `BETWEEN`
- **Recherche textuelle** : utiliser `LIKE` ou `ILIKE` avec des `%` autour du terme recherché
- **Filtres sur les genres** : passer par la table d'association avec une jointure et comparer avec `IN (...)` pour un OU logique entre plusieurs genres
- **Accumuler** les conditions dans un tableau et les combiner avec `AND` à la fin, plutôt que de construire une longue chaîne de caractères d'un coup

Attention : un film qui correspond à plusieurs genres demandés apparaît une fois par genre correspondant dans le résultat de la jointure. Attention également à ne pas retourner uniquement les genres qui ont servi au filtre : un film trouvé avec `genre=Action` doit quand même retourner la liste complète de ses genres.

### Colonnes dynamiques, tri et injection SQL

Les paramètres `fields` et `sortBy` déterminent des **noms de colonnes**, et non des valeurs :

```javascript
// Ceci NE fonctionne PAS : $1 ne peut remplacer qu'une valeur, jamais un nom de colonne
const result = await pool.query("SELECT title FROM movies ORDER BY $1", [sortBy]);
```

Un nom de colonne doit donc être inséré directement dans la chaîne de caractères de la requête. Comme il provient du client, le concaténer tel quel ouvre une injection SQL (`sortBy=year;DROP TABLE movies--`). La seule protection est de **valider chaque champ demandé contre une liste blanche** des colonnes autorisées avant de l'utiliser. Les deux listes vous sont fournies dans le fichier [util.js](./server/src/util.js).

Le reste des règles est le même que pour l'exercice avec les projections :

- La colonne `id` n'est jamais retournée dans les réponses
- Champs à inclure : `fields=title,year,imdbRating`
- Champs à exclure : `fields=-budget,-boxOffice`
- On ne peut pas combiner inclusion et exclusion
- Tri ascendant ou descendant sur différents champs

## Conseils d'implémentation

1. **Validez les paramètres** avant de construire les requêtes
2. **Utilisez les requêtes préparées** pour toutes les valeurs qui proviennent du client
3. **Testez avec différentes combinaisons** de paramètres
4. **Gérez les cas d'erreur** (paramètres invalides, etc.). Une erreur lancée par `searchMovies` est déjà attrapée par le routeur et retournée avec un code `400`.

## Tests recommandés

1. **Filtres simples** : Un seul paramètre à la fois
2. **Filtres de plage** : Combinaisons de min/max. Les attributs `imdbRating`, `runtime` et `budget` sont les seuls qui supportent les plages.
3. **Filtres multiples** : Plusieurs critères simultanés
4. **Tri et sélection des colonnes** : Différentes combinaisons d'affichage
5. **Cas limites** : Requêtes sans résultats, paramètres invalides, tentatives d'injection SQL

# Solution

Une solution possible est disponible dans le fichier [movieManager.solution.js](./server/src/movieManager.solution.js). Vous pouvez tester cette solution en modifiant l'import dans [movieRouter.js](./server/src/movieRouter.js).

La solution proposée utilise la syntaxe `async`/`await`. Vous pouvez vous en inspirer pour votre solution.
