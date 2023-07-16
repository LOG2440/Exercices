import loadTheme from "../utils.js";

const textPicker = document.getElementById('picker-text');
const borderPicker = document.getElementById('picker-border');
const backgroundPicker = document.getElementById('picker-background');

// TODO : Charger le thème
let theme = JSON.parse(localStorage.getItem('theme'));
if (theme) {
    loadTheme(theme);
}
else {
    // Valeurs par défaut dans le CSS
    theme = {
        textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color'),
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background-color')
    };
}

textPicker.value = theme.textColor;
borderPicker.value = theme.borderColor;
backgroundPicker.value = theme.backgroundColor;

function setColor(theme, value, propertyName, cssVariableName) {
    theme[propertyName] = value;
    document.documentElement.style.setProperty(cssVariableName, value);
}

textPicker.addEventListener('input', (event) => {
    setColor(theme, event.target.value, 'textColor', '--text-color');
});

borderPicker.addEventListener('input', (event) => {
    setColor(theme, event.target.value, 'borderColor', '--border-color');
});

backgroundPicker.addEventListener('input', (event) => {
    setColor(theme, event.target.value, 'backgroundColor', '--background-color');
});

// TODO : Mettre à jour le thème dans l'espace de stockage
document.getElementById('save-button').addEventListener('click', () => {
    localStorage.setItem('theme', JSON.stringify(theme));
});

// TODO : Retirer le thème de l'espace de stockage
document.getElementById('reset-button').addEventListener('click', () => {
    localStorage.removeItem('theme');
    location.reload();
});