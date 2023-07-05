const ButtonHandler = {
    getRandom: function () {
        return Math.floor(Math.random() * 10 + 1);
    },
    showValue: function () {
        const randomValue = this.getRandom();
        const display = document.getElementById("random-display");
        display.textContent = `Valeur aléatoire : ${randomValue}`;
    },
    addHandler: function (element) {
        // Solution #1 : définir la valeur de this avec bind
        element.addEventListener("click", this.showValue.bind(this));

        // Solution #2 : définir la valeur de this avec ()=>{}
        // button.addEventListener("click", () => this.showValue);
    },
};

const button = document.getElementById("btn");
ButtonHandler.addHandler(button);