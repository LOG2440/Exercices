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
        element.addEventListener("click", this.showValue);
    },
};

const button = document.getElementById("btn");
ButtonHandler.addHandler(button);