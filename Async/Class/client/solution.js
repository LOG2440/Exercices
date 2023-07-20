const SERVER_URL = "http://localhost:5000";

async function init() {
    const url = `${SERVER_URL}/obtenirCours`;
    const res = await fetch(url);
    const courses = await res.json();
    getCourses(courses);
}

function getCourses(courses) {
    const container = document.getElementById("class-container");
    container.innerHTML = "";
    courses.forEach((c) => {
        const cours_paragraph = document.createElement("p");
        cours_paragraph.textContent = `${c.sigle} : ${c.credits}`;
        container.appendChild(cours_paragraph);
    });
}

// TODO : obtenir les informations d'un cours en fonction de son sigle et afficher le message dans span-find-result
function findCourse() {
    const course = document.getElementById("input-find-class").value;
    if (course) {
        const url = `${SERVER_URL}/obtenirCours/${course}`;
        fetch(url)
            .then((response) => response.json())
            .then((c) => {
                document.getElementById("span-find-result").textContent = JSON.stringify(c);
            });
    }
}

// TODO : créer un nouveau cours avec des données aléatoires et rafraichir la liste des cours
// Si le cours existe déjà, afficher le message du serveur dans span-add-result
function addCourse() {
    const sigle = document.getElementById("input-add-class").value;
    if (!sigle) return;
    const course = { sigle: sigle };

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
    };
    const url = `${SERVER_URL}/ajouterCours`;
    fetch(url, opts).then((response) => {
        if (response.status === 409) {
            response.json().then(res => {
                document.getElementById("span-add-result").textContent = res.error;
            });
            return;
        } else {
            response.text().then(text => {
                document.getElementById("span-add-result").textContent = text;
                init();
            });
        }
    });
}

// TODO : supprimer un cours en fonction de son sigle et afficher le message dans le span span-delete-result
function deleteCourse() {
    const course = document.getElementById("input-delete-class").value;
    if (course) {
        const opts = {
            method: "DELETE",
        };
        const url = `${SERVER_URL}/supprimerCours/${course}`;
        fetch(url, opts)
            .then((res) => res.text())
            .then((message) => {
                document.getElementById("span-delete-result").textContent = message;
                init();
            });
    }
}

// TODO : modifier le nombre de crédit d'un cours en fonction de son sigle et afficher le message dans le span span-modify-result
function changeCourse() {
    const sigle = document.getElementById("input-modify-class").value;
    const credits = document.getElementById("input-modify-credits").value;
    if (sigle && credits) {
        const course = { sigle: sigle, credits: credits };
        const opts = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course),
        };
        const url = `${SERVER_URL}/modifierCours`;
        fetch(url, opts)
            .then((res) => res.text())
            .then((message) => {
                document.getElementById("span-modify-result").textContent = message;
                init();
            });
    }
}

window.onload = init;


/*
     Question théorique :
     La version initiale du code considère le cours inf1000 et INF1000 comme cours différents.
     Il faudrait uniformiser la gestion des cours et traiter les 2 de la même manière.
     Ceci devrait être fait minimalement dans le code du serveur et idéalement dans le code du client aussi.
*/