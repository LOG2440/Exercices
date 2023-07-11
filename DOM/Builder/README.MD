# Construction des éléments du DOM

Cet exercice couvre les notions de construction dynamique d'élément du DOM. 

Plusieurs libraires telles que [React](https://react.dev/reference/react/createElement) ont des fonctions utilitaires qui permettent de créer des éléments HTML dynamiquement sans avoir à écrire du code dupliquée à chaque fois pour générer des éléments avec des propriétés (id, classes, etc.).

## Mise en situation

Vous devez implémenter une page web qui présente des informations sur les différentes universités ou facultés de génie à Montréal. Ces données sont présentes dans l'objet `schools` dans le code JS fourni. 

### Vue initiale

Les informations sont présentés dans une grille de 2 colonnes. Le code initial dans le fichier [index.html](./index.html) présente le rendu final attendu. Vous pouvez visualiser ce rendu en retirant la référence vers le script à la ligne 8.

Initialement, le code fourni génère le titre dans une balise `<h2>` et une balise `<a>` vide. Vous devez compléter le code pour obtenir le rendu final attendu.

### Rendu visuel final

![](./assets/exercice_rendu_final.png)

# Fonctions à implémenter

## createElement

Vous devez implémenter la fonction `createElement(type,props,children)` qui permet de construire des objets `HTMLElement` (paramètre `type`) avec un certain nombre de propriétés (paramètre `props`) ainsi qu'une arborescence quelconque (paramètre `children`). 

Le paramètre `type` représente le nom de la balise HTML à créer. Cet attribut est le seul qui n'est pas optionnel.

Le paramètre `props` a le format suivant :

```js
props =
{
    id: string;
    classes: string[];
    rest: {
        [x: string]: string;
    };
}
```

- L'attribut `id` représente l'id de l'élément. 
- L'attribut `classes` représente une liste de classes à ajouter à l'élément.
- L attribut `rest` est un simple objet clé-valeur dont les valeur sont toujours des `string`. 

Tous les 3 attributs sont optionnels et peuvent ne pas exister sur l'objet. `props` peut également être `null` si on veut créer un élément HTML simple.


Le paramètre `children` est un tableau d'objets `HTMLElement` ou `string` qui reprente les éléments enfants de l'objet à construire. Tous les éléments doivent être rajoutés à l'élément final. Il devrait être possible de construire les éléments de type `HTMLElement` avec la fonction `createElement`. 

### Exemple d'utilisation

L'appel de fonction suivant :

```js
 const card = createElement('a',
    { id: '123', 
      classes: ['school-card'], 
      rest: { href: 'https://polymtl.ca', target: '_blank' },
      [ createElement('div',null,['Polytechnique Montréal'])] 
    });
```

Devrait produire le code HTML suivant :

```html
<a id='123' class='school-card' href='https://polymtl.ca' target='_blank'>
    <div> Polytechnique Montréal </div>
</a>
```

## buildSchoolCard

Vous devez compléter la fonction `buildSchoolCard(school)` qui construit l'arborescence HTML complète pour les informations d'une école. Référez-vous au code dans [index.html](./index.html) pour la structure complète à construire.

Le code initial fourni ajoute le 1er élément de `children` s'il existe. Ce code est à modifier pour la version finale.

## Solution

Si vous avez bien implémenté les 2 fonctions, vous devez avoir le même rendu final que présenté dans [index.html](./index.html).

Une solution est disponible dans le fichier [solution.js](./solution.js). Vous pouvez référencer le fichier en modifiant l'attribut src de la ligne 8 du fichier [index.html](./index.html).