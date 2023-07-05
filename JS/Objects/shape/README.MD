# Exercice 1

Cet exercice couvre les notions de base des prototypes, fonctions constructeurs, les usines et les _mixin_ en JavaScript.

Le fichier [shape.js](./shape.js) contient tout le code de départ nécessaire.

## Partie 1 : Prototypes

Vous devez implémenter la fonction constructeur `Shape(type,color)`. Vous devez permettere à ce que l'attribut `type` soit modifiable après la création d'un objet seulement en modifiant la fonction `getType()` fournie.

Vous devez implémenter la fonction `describe()` qui affiche la couleur et la forme d'un objet construit par `Shape`. Cette fonction doit être applicable sur n'importe quel objet de type `Shape`.

## Partie 2 : Factory

Vous devez implémenter la fonction `RectangleFactory(obj, width, height)` qui retourne un nouveau objet de type `Object` qui contient tout ce que le paramètre `obj` contient déjà ainsi que les propriétés `width`, `height` et la fonction `getArea()` qui calcule la surface du rectangle.

## Partie 3 : Mixin

Vous devez implémenter lafonction `CircleMixin(obj, radius)` qui ajoute l'attribut `radius` et la fonction `getArea()` au paramètre `obj`.

Rappel : la surface d'un cercle est obtenue par l'équation : $\pi$*r<sup>2</sup>

## Partie 4 : Chaîne de prototypes

Le code suivant fourni lance une erreur. Expliquez la raison de cette erreur.

```js
Shape.prototype.isBigger = 
    function (otherObj) { 
        return this.getArea() > otherObj.getArea() 
    };

circle.isBigger(square);
square.isBigger(circle);

```

Vous devez donner **2** solutions possibles pour corriger ce problème. Au moins 1 des solutions ne devrait pas modifier les prototypes de `circle` ou `square`.

## Solution

La solution des 4 parties est disponible dans le fichier [solution.js](./solution.js).

# Exercice 2 

Cet exercice se base sur le premier et les différents objets créés tout au long des parties.

Vous devez transformer les différentes manières de construire des objets en une manière uniforme en utilisant la syntaxe de _class_.

Vous devez compléter les classes suivantes : `Shape`, `Circle`, `Rectangle` et `Square`. Pour chaque classe, vous avez un exemple d'utilisation et la valeur finale attendue.

Vous devez minimiser la duplication de code et utiliser la notion d'héritage entre les différentes classes.

Tout comme l'exercice #1, l'attribut `type` ne devrait pas être accessible autrement que la méthode `getType()`. Contrairement à partie 1, vous n'avez pas besoin de rendre le type modifiable après la création d'un objet.

## Solution

La solution de l'exercice est disponible dans le fichier [class_solution.js](./class_solution.js).
