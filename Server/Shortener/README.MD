# URL Shortener

Un _URL Shortener_ est un service qui permet de réduire la taille d'une URL en la remplaçant par une version plus courte. Par exemple, l'URL `https://www.google.com/search?q=shortener` pourrait être remplacée par `https://short.com/abc123`.

Ce mécansime est très utile pour partager des liens sur les réseaux sociaux ou dans des messages texte, où la longueur des caractères est limitée. Habituellement, ce service est un intermédiaire qui redirige l'utilisateur vers l'URL d'origine lorsqu'il clique sur le lien raccourci. Par exemple, si un utilisateur clique sur `https://short.com/abc123`, il sera redirigé vers `https://www.google.com/search?q=shortener`.


## Installation des dépendances et lancement du serveur

Vous devez installer les dépendances du projet avec la commande `npm ci`. Vous pouvez lancer le serveur avec la commande `npm start`.

# Projet à implémenter

Pour vous aider, un squelette de projet est fourni dans le fichier [shortener.js](./shortener.js) que vous devez compléter. Il contient un serveur HTTP qui écoute sur le port 3000. Le serveur contient, par défaut, 3 liens courts dans sa _base de données_ (disponibles dans le fichier [default.js](./default.js)). Les informations de chaque entrée sont les suivantes :
```js
{ 
    shortcode: "abc123", // code court unique
    originalUrl: "https://example.com", // URL d'origine à raccourcir
    hits: 0 // nombre de fois que le lien a été accédé
}
```

La fonction fournie `generateShortcode()` génère un code court aléatoire de 6 caractères. Notez que pour des fins de simplicité, on ne gère pas les collisions de codes courts dans cet exercice.

La gestion de la méthode `DELETE /reset` vous est déjà fournie et permet de réinitialiser la base de données à son état initial. Vous pouvez l'utiliser pour tester votre service.

## Exercice #1 : génération de liens courts

Vous devez compléter l'implémentation du service de raccourcissement d'URL. Le service doit être capable de recevoir une requête HTTP `POST /shorten` contenant une URL à raccourcir dans le corps de la requête. Le service doit ensuite générer un lien court et le retourner dans la réponse sous le format d'un objet JSON :

```json
{
  "shortcode": "abc123",
  "shortUrl": "http://localhost:3000/sh/abc123"
}
```

Cette informations est également sauvegardée dans la base de données du serveur (objet `urlDatabase`). Dans le cas où l'URL est déjà présente dans la base de données, le service doit retourner le même code court que celui déjà présent ainsi qu'un code de réponse HTTP approprié.

## Exercice #2 : redirection vers l'URL d'origine

Le service doit être capable de rediriger l'utilisateur vers l'URL d'origine lorsqu'il accède à un lien court. Pour cela, vous devez compléter l'implémentation du service pour qu'il puisse recevoir une requête HTTP `GET /sh/:shortcode`. Le service doit ensuite rechercher le code court dans la base de données et rediriger l'utilisateur vers l'URL d'origine. Si le code court n'existe pas, le service doit retourner une erreur 404.

Vous devez compléter le _middleware_ `findUrl` qui permet d'extraire le code court de la requête (ex : `/sh/abc123` donnerait `abc123`) et de le rechercher dans la base de données. Si le code court est trouvé, l'entrée correspondante dans la base de données doit être ajoutée à l'objet `req` pour être utilisée dans la suite du traitement. Si le code court n'est pas trouvé, le _middleware_ doit retourner un code de réponse HTTP approprié.

**Note** : la gestion des routes pour Exercice #2 et Exerice #3 doit être faite par un routeur Express qui gère le préfixe `/sh`. Vous devez donc configurer et attacher ce routeur au serveur.

## Exercice #3 : statistiques d'accès

Le service doit être capable de tenir compte du nombre d'accès à un lien court et mettre à jour l'attribut `hits` de l'entrée correspondante dans la base de données à chaque accès valide.

Le service doit être capable de retourner le nombre d'accès à un lien court. Pour cela, vous devez compléter l'implémentation du service pour qu'il puisse recevoir une requête HTTP `GET /sh/:shortcode/stats`. Le service doit ensuite rechercher le code court dans la base de données et retourner ces informations (lien court, URL d'origine et nombre d'accès) dans la réponse.

Le service doit également permettre de réinitialiser le nombre d'accès à 0. Pour cela, vous devez compléter l'implémentation du service pour qu'il puisse recevoir une requête HTTP `XYZ /sh/:shortcode/stats/reset` (verbe HTTP à vous de choisir). Le service doit retourner un code de réponse HTTP approprié.


# Solution et tests de validation

Une solution possible est fournie dans le fichier [solution.js](./solution.js). Vous pouvez l'utiliser pour valider votre solution et vous aider à comprendre le fonctionnement du service. Il suffit de remplacer le module importé au début du fichier [server.js](./server.js) par le module de la solution.

L'exercice est accompagné de tests automatisés unitaires et de bout en bout pour vous aider à valider votre solution. Vous pouvez les exécuter avec la commande `npm test`. Notez que les tests assumment l'utilisation de certains verbes HTTP qui peuvent différer de ceux de votre utilisation. Vous pouvez les modifier pour qu'ils correspondent à votre implémentation. Vous pouvez également ajouter vos propres tests pour valider votre solution.