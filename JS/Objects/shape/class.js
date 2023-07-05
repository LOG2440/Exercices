class Shape {
    // le type ne devrait pas être modifiable hors de la classe
    constructor(type, color) { }
    getType() { };
    describe() { return `` };
}

class Circle { }
const circle = new Circle('circle', 'red', 1);
console.log(circle.getType()); // circle
console.log(circle.getArea().toFixed(2)); // 3.14

class Rectangle { }
const rectangle = new Rectangle('rectangle', 'green', 2, 10);
console.log(rectangle.describe()); // green rectangle
console.log(rectangle.getArea()); // 20

class Square { }
const square = new Square('square', 'blue', 5);
console.log(square.describe()); // blue square
console.log(square.getArea()); // 25