/// Partie 1 : Prototypes
function Shape(type, color) {
    this.color = color;
    this.getType = function () { return this.type ? this.type : type };
}

Shape.prototype.describe = function () { return `${this.color} ${this.getType()}` };

const circle = new Shape('circle', 'red');
const ellipse = Object.create(circle);
ellipse.type = 'ellipse';
console.log(ellipse.getType()); // valeur désirée : ellipse
console.log(ellipse.describe()); // valeur désirée : red ellipse

/// Partie 2 : Factory
function RectangleFactory(obj, width, height) {
    return {
        ...obj,
        width,
        height,
        getArea: function () { return this.width * this.height }
    };
}

const rectangle = new Shape('square', 'blue');
const square = RectangleFactory(rectangle, 5, 5);
console.log(square.getType()); // square
console.log(square.getArea()); // 25


/// Partie 3 : Mixin
function CircleMixin(obj, radius) {
    Object.assign(obj, {
        radius,
        getArea: function () { return Math.PI * Math.pow(this.radius, 2) }
    });
}

CircleMixin(circle, 1);
console.log(circle.getArea().toFixed(2)); // 3.14

/// Partie 4 : Chaîne de prototypes
Shape.prototype.isBigger = function (otherObj) { return this.getArea() > otherObj.getArea() };
circle.isBigger(square);

/// Il faut ajouter Shape dans la chaîne de prototypes de square
Object.setPrototypeOf(square, Shape.prototype);
square.isBigger(circle);

// Autre solution : ne pas lier isBigger à un prototype
const isBigger = (a, b) => a.getArea() > b.getArea();
