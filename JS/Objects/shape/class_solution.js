class Shape {
    #type;
    constructor(type, color) {
        this.color = color;
        this.#type = type;
    }
    getType() { return this.#type };
    getArea() { };
    describe() { return `${this.color} ${this.#type}` };
}

class Circle extends Shape {
    constructor(type, color, radius) {
        super(type, color);
        this.radius = radius;
    }
    getArea() { return Math.PI * Math.pow(this.radius, 2) }
}

const circle = new Circle('circle', 'red', 1);
console.log(circle.getType()); // circle
console.log(circle.getArea().toFixed(2)); // 3.14

class Rectangle extends Shape {
    constructor(type, color, width, height) {
        super(type, color);
        [this.width, this.height] = [width, height];
    }
    getArea() { return this.width * this.height }
}
const rectangle = new Rectangle('rectangle', 'green', 2, 10);
console.log(rectangle.describe()); // green rectangle
console.log(rectangle.getArea()); // 20

class Square extends Rectangle {
    constructor(type, color, side) {
        super(type, color, side, side);
    }
}
const square = new Square('square', 'blue', 5);
console.log(square.describe()); // blue square
console.log(square.getArea()); // 25