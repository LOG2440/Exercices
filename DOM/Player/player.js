const audio = new Audio(); // HTMLAudioElement pour jouer du son. Implémente l'interface HTMLMediaElement
const songs = document.getElementsByClassName('song-item');
let selectedSong = 0;

// TODO : récupérer le lien vers l'audio
audio.src = songs[selectedSong];

const timeline = document.getElementById('timeline');

/**
 * Associe une fonction à une chaîne de caractères.
 * @type {Map<string,function>}
 * 
 * Exemple d'utilisation:
 *  `shortcutManaget.set('a' () => console.log('allo'));`
 */
const shortcutManager = new Map();


/**
 * Ajoute des gestionnaires d'événements pour différentes actions dans la page
 * TODO : Ajouter des gestionnaires pour les événements suivants :
 *  - Cliquer sur le bouton 'play' : jouer/pause de la chanson
 *  - Cliquer sur le bouton 'previous' : jouer la chanson précédante
 *  - Cliquer sur le bouton 'next' : jouer la prochaine chanson
 *  - Cliquer sur une des chansons dans la liste : jouer la chanson
 *  - Fin de la chanson : jouer la prochaine chanson
 *  - Déroulement de la chanson : mise à jour de la barre de progrès
 */
function bindEvents() {

    // TODO : ajouter des gestionnaires pour les boutons de contrôle

    /// TODO : ajouter un gestionnaire à l'élément audio pour le déroulement d'une chanson
    audio.addEventListener('todo', () => { });

    /// TODO : ajouter un gestionnaire à l'élément audio pour la fin d'une chanson
    audio.addEventListener('todo', () => { });

    /// TODO : ajouter un gestionnaire sur chaque élément song-item qui joue la chanson de l'item

    /// Gestionnaire de contrôle du moment de la chanson en fonction de la barre de progrès
    timeline.addEventListener("input", () => {
        audioSeek(parseInt(timeline.value));
    });
}

/**
 * Ajoute des raccourcis pour les contrôles de chanson
 * Toute autre touche est ignorée par le système
 * TODO : ajouter les touches suivantes aux actions suivantes :
 *  - Espace (' ') : jouer/pause
 *  - N            : prochaine chanson
 *  - P            : chanson précédante
 *  - J            : reculer de 5 secondes
 *  - L            : avancer de 5 secondes
 */
function bindShortcuts() {
}

bindEvents();
bindShortcuts();


/**
 * Charge une nouvelle source dans l'élément audio et joue l'audio.
 * Si src est n'est pas fournie, la chanson en cours est mise en pause ou sortie de pause
 * 
 * Modifie l'icone du bouton Play
 * 
 * Affiche le nom de la chanson dans l'interface
 * @param {string | undefined} src source du fichier 
 */
function play(src) {
    if (src) {
        audio.src = src;
        audio.play();
    }
    else {
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
    }
    playButton.classList.toggle('fa-pause', !audio.paused);
    playButton.classList.toggle('fa-play', audio.paused);

    // TODO : mettre à jour l'affichage de l'élément 'now-playing' à partir du nom de la chanson

}

/**
 * Incrémente l'index de 1. Si l'index dépasse la taille du tableau, l'index devient 0
 * Joue la chason au nouveau index
 */
function playNext() {
    selectedSong = (selectedSong + 1) % songs.length;
    play(songs[selectedSong].dataset.url);
}

/**
 * Décrémente l'index de 1. Si l'index dépasse 0, l'index devient la taille du tableau -1
 * Joue la chason au nouveau index
 */
function playPrevious() {
    selectedSong = selectedSong - 0 <= 0 ? songs.length - 1 : selectedSong - 1;
    play(songs[selectedSong].dataset.url);
}

/**
 * Déplace le moment courrant de la chanson à une certaine valeur en pourcentage
 * @param {number} timelineValue la valeur de progres en pourcentage (0-100) 
 */
function audioSeek(timelineValue) {
    const time = (timelineValue * audio.duration) / 100;
    audio.currentTime = time;
}