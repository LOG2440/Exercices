# Tests pour l'exercice Movies

Ce fichier contient des exemples de requêtes pour tester votre implémentation.

## Exemples de requêtes

Ces requêtes peuvent être exécutées dans un terminal ou un outil comme Postman ou ThunderClient.

Chaque requête va retourner au moins 1 résultat basé sur les données insérées dans les tables par `db/postgres.sql`. Assurez-vous que votre serveur est en cours d'exécution avant de lancer ces requêtes.

### Tests de base

```bash
# Tous les films
curl "http://localhost:3000/movies/search"
Résultats : tous les films

# Films d'une année spécifique
curl "http://localhost:3000/movies/search?year=1999"
Résultats : "The Matrix"

# Films par plage d'années (1900-2000)
curl "http://localhost:3000/movies/search?yearFrom=1990&yearTo=2000"
Résultats : "The Matrix", "The Shawshank Redemption", "Pulp Fiction"
```

### Tests de filtres

```bash
# Films par genre
curl "http://localhost:3000/movies/search?genre=Action"
Résultats : "The Matrix", "Inception", "Seven Samurai", "Avatar"

# Films par plusieurs genres
curl "http://localhost:3000/movies/search?genre=Action,Sci-Fi"
Résultats : "The Matrix", "Inception", "Interstellar", "Seven Samurai", "Avatar"

# Films par réalisateur (recherche partielle)
curl "http://localhost:3000/movies/search?director=Nolan"
Résultats : "Inception", "Interstellar"

# Films avec note minimum
curl "http://localhost:3000/movies/search?minRating=9.0"
Résultats : "The Shawshank Redemption", "Spirited Away", "Seven Samurai"
```

### Tests de tri

```bash
# Tri par note décroissante
curl "http://localhost:3000/movies/search?sortBy=imdbRating&sortOrder=desc"
Résultats : tous les films avec "The Shawshank Redemption" en premier et "Avatar" en dernier

# Tri par année croissante
curl "http://localhost:3000/movies/search?sortBy=year&sortOrder=asc"
Résultats: tous les films avec "Casablanca" en premier et "Interstellar" en dernier

# Tri par box office décroissant
curl "http://localhost:3000/movies/search?sortBy=boxOffice&sortOrder=desc"
Résultats : tous les films avec "Avatar" en premier et "Seven Samurai" en dernier
```

### Tests de sélection des colonnes

```bash
# Seulement titre, année et note
curl "http://localhost:3000/movies/search?fields=title,year,imdbRating"

# Exclure budget et box office
curl "http://localhost:3000/movies/search?fields=-budget,-boxOffice"

# Films japonais avec champs spécifiques
curl "http://localhost:3000/movies/search?country=Japan&fields=title,director,year"
Résultats : "Spirited Away", "Seven Samurai" avec les champs spécifiés
```

### Tests complexes

```bash
# Films en japonais avec une note minimale de 8.0 et moins que 3 heures
curl "http://localhost:3000/movies/search?language=Japanese&minRating=8.0&maxRuntime=180"
Résultats : "Spirited Away"

# Films d'action depuis 2005 avec bonne note
curl "http://localhost:3000/movies/search?genre=Action&yearFrom=2005&minRating=8.0&sortBy=imdbRating&sortOrder=desc&fields=title,year,imdbRating,director"
Résultats : "Inception"

# Films de Nolan avec budget élevé
curl "http://localhost:3000/movies/search?director=Nolan&minBudget=162500000&sortBy=boxOffice&sortOrder=desc&fields=title,budget,boxOffice"
Résultats : "Interstellar"

# Films de plus de 2h30 des États-Unis avec un score élevé
curl "http://localhost:3000/movies/search?minRuntime=150&country=USA&minRating=8.0&sortBy=runtime&sortOrder=desc&fields=title,runtime,imdbRating"
Résultats : "Interstellar", "Pulp Fiction"
```

### Tests de cas limites et d'injection SQL

Ces requêtes doivent être refusées avec un code `400` et un message d'erreur, jamais exécutées.

```bash
# Champ de tri qui n'existe pas
curl "http://localhost:3000/movies/search?sortBy=password"
Résultat : erreur 400

# Tentative d'injection à travers le tri
curl "http://localhost:3000/movies/search?sortBy=year;DROP+TABLE+movies--"
Résultat : erreur 400, la table movies existe toujours

# Tentative d'injection à travers les colonnes retournées
curl "http://localhost:3000/movies/search?fields=title,(SELECT+1)"
Résultat : erreur 400

# Inclusion et exclusion combinées
curl "http://localhost:3000/movies/search?fields=title,-budget"
Résultat : erreur 400

# Valeur numérique invalide
curl "http://localhost:3000/movies/search?minRating=abc"
Résultat : erreur 400
```

Ces requêtes doivent quant à elles réussir sans lever d'erreur :

```bash
# Aucun film ne correspond
curl "http://localhost:3000/movies/search?year=1800"
Résultat : []

# La valeur recherchée est traitée comme du texte et non comme du SQL
curl "http://localhost:3000/movies/search?director=%25'+OR+'1'%3D'1"
Résultat : []

# Le filtre par genre ne doit pas tronquer la liste des genres retournés
curl "http://localhost:3000/movies/search?genre=Action&fields=title,genre"
Résultats : "The Matrix" avec ["Action","Sci-Fi"], "Inception" avec ["Action","Sci-Fi","Thriller"],
            "Seven Samurai" avec ["Action","Drama"], "Avatar" avec ["Action","Adventure","Fantasy"]
```

## Validation des résultats

Vérifiez que :
- Les filtres sont correctement appliqués
- Le tri fonctionne dans les deux sens
- Les colonnes retournées correspondent aux champs inclus/exclus
- La colonne `id` n'est jamais retournée
- Un film est retourné une seule fois, même s'il correspond à plusieurs genres demandés
- Les paramètres invalides sont bien gérés et aucune valeur reçue du client n'est concaténée dans une requête
