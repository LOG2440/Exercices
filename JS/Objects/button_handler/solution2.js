const ButtonHandler = {

    showValue: function (getRandom) {
        const randomValue = getRandom();
        const display = document.getElementById("random-display");
        display.textContent = `Valeur aléatoire : ${randomValue}`;
    },
    addHandler: function (element, getRandom) {
        element.addEventListener("click", () => this.showValue(getRandom));
    },
};

const getRandom = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
const button = document.getElementById("btn");
ButtonHandler.addHandler(button, getRandom);