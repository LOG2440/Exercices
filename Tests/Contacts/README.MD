# Tests de bout en bout (Cypress)

## Mise en situation

Le code fourni est un petit carnet de contacts sur 2 pages :

- [`index.html`](./src/index.html) : la page d'accueil, qui affiche la liste des contacts et un champ de recherche pour les filtrer.
- [`add.html`](./src/add.html) : la page pour ajouter un nouveau contact (nom et courriel).

Un menu de navigation est présent sur les 2 pages pour passer de l'une à l'autre. Au premier chargement de la page d'accueil, 3 contacts par défaut sont automatiquement ajoutés au carnet (voir `seedContacts()` dans [contacts.js](./src/contacts.js)). Les contacts sont conservés dans le `localStorage` du navigateur, donc ils persistent entre les rechargements de page.

Vous pouvez essayer le site web en lançant un serveur statique avec la commande `npm start`. Assurez-vous d'installer les dépendances avec `npm ci` en premier.

## Code fourni

Toute la logique de l'application est déjà implémentée :

- [`contacts.js`](./src/contacts.js) : classe `ContactStore`, qui gère les données (ajout, suppression, recherche, validation) dans le `localStorage`.
- [`index.js`](./src/index.js) : classe `ContactListPage`, qui affiche et filtre la liste sur la page d'accueil.
- [`add.js`](./src/add.js) : classe `AddContactPage`, qui valide et soumet le formulaire d'ajout.

Vous n'avez **aucun code à écrire dans `src/`**. L'exercice consiste uniquement à écrire les tests de bout en bout (e2e) avec Cypress.

## Tests à écrire

Vous devez implémenter les tests dans le fichier [contacts.cy.js](./cypress/e2e/contacts.cy.js). Un test "vide" (`expect(true).to.equal(false)`) y est présent pour déclencher l'exécution de la suite ; vous pouvez le retirer une fois vos tests écrits.

Voici les comportements à couvrir :

1. **Page d'accueil** : le titre s'affiche et les 3 contacts par défaut sont présents au premier chargement.
2. **Recherche** : taper dans le champ de recherche filtre la liste ; une recherche sans résultat affiche le message vide.
3. **Suppression** : cliquer sur `Supprimer` retire un contact de la liste.
4. **Persistance** : après un rechargement de la page, les changements (ex. une suppression) sont conservés.
5. **Navigation** : cliquer sur les liens du menu change de page et met à jour le lien actif.
6. **Ajout** : soumettre le formulaire vide affiche une erreur ; le remplir correctement ajoute le contact et retourne à la page d'accueil.

## Installation des librairies de tests

Les dépendances nécessaires sont définies dans le fichier [package.json](./package.json). Vous pouvez utiliser la commande `npm ci` pour installer la version exacte de la librairie utilisée pour la solution.

## Exécution des tests

Démarrez d'abord le serveur statique avec `npm start` (dans un terminal séparé, laissez-le tourner). Vous pouvez ensuite exécuter les tests avec :

- `npm run cypress` : ouvre l'interface graphique de Cypress pour lancer et déboguer vos tests un à un.
- `npm run cypress:run` : exécute tous les tests en mode headless dans le terminal.

# Solution

Une solution est disponible dans le fichier [contacts.solution.cy.js](./cypress/e2e/contacts.solution.cy.js). Notez qu'il peut y avoir plus qu'une manière d'implémenter correctement l'exercice.

Notez que, par défaut, l'exécution de ces tests est ignorée à cause de la méthode `skip` sur la fonction `describe`. Vous pouvez retirer `skip` pour exécuter les tests.
