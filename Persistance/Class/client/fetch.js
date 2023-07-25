const SERVER_URL = "http://localhost:5000";

async function init() {
    const url = `${SERVER_URL}/cours/obtenirCours`;
    const res = await fetch(url);
    const courses = await res.json();
    getCourses(courses);
}

function getCourses(courses) {
    const container = document.getElementById("class-container");
    container.innerHTML = "";
    if (courses.length == 0) {
        const h1 = document.createElement("h1");
        h1.textContent = 'Aucun cours disponible';
        container.append(h1);
    }
    courses.forEach((c) => {
        const cours_paragraph = document.createElement("p");
        cours_paragraph.textContent = `${c.sigle} : ${c.credits}`;
        container.appendChild(cours_paragraph);
    });
}

function findCourse() {
    const course = document.getElementById("input-find-class").value;
    if (course) {
        const url = `${SERVER_URL}/cours/obtenirCours/${course}`;
        fetch(url)
            .then((response) => response.json())
            .then((c) => {
                document.getElementById("span-find-result").textContent = JSON.stringify(c);
            });
    }
}

function addCourse() {
    const sigle = document.getElementById("input-add-class").value;
    if (!sigle) return;
    const course = { sigle: sigle };

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
    };
    const url = `${SERVER_URL}/cours/ajouterCours`;
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

function deleteCourse() {
    const course = document.getElementById("input-delete-class").value;
    if (course) {
        const opts = {
            method: "DELETE",
        };
        const url = `${SERVER_URL}/cours/supprimerCours/${course}`;
        fetch(url, opts)
            .then((res) => res.text())
            .then((message) => {
                document.getElementById("span-delete-result").textContent = message;
                init();
            });
    }
}

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
        const url = `${SERVER_URL}/cours/modifierCours`;
        fetch(url, opts)
            .then((res) => res.text())
            .then((message) => {
                document.getElementById("span-modify-result").textContent = message;
                init();
            });
    }
}

function deleteAll() {
    const url = `${SERVER_URL}/cours/supprimerTout`;
    fetch(url, { method: "DELETE" })
        .then(() => {
            init()
        });
}

window.onload = init;