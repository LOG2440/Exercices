const SERVER_URL = "http://localhost:5000";

async function init() {
    const url = `${SERVER_URL}/cours`;
    const res = await fetch(url);
    const courses = await res.json();
    getCourses(courses);
    await getCoursesWithTeachers();
    await getTeachers();
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
        const url = `${SERVER_URL}/cours/${course}`;
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
    const url = `${SERVER_URL}/cours`;
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
        const url = `${SERVER_URL}/cours/${course}`;
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
        const url = `${SERVER_URL}/cours`;
        fetch(url, opts)
            .then((res) => res.text())
            .then((message) => {
                document.getElementById("span-modify-result").textContent = message;
                init();
            });
    }
}

function deleteAll() {
    const url = `${SERVER_URL}/cours/reset`;
    fetch(url, { method: "DELETE" })
        .then(() => {
            init()
        });
}

async function getCoursesWithTeachers() {
    const res = await fetch(`${SERVER_URL}/prof/cours`);
    const courses = await res.json();
    const container = document.getElementById("class-teacher-container");
    container.innerHTML = "";
    if (!courses.length) {
        const p = document.createElement("p");
        p.textContent = "Aucun cours disponible";
        container.append(p);
        return;
    }
    courses.forEach((c) => {
        const paragraph = document.createElement("p");
        // un cours sans professeur assigné a la valeur null (NULL dans la base de données)
        paragraph.textContent = `${c.sigle} (${c.credits} crédits) : ${c.professeur ?? "aucun professeur"}`;
        container.appendChild(paragraph);
    });
}

async function getTeachers() {
    const res = await fetch(`${SERVER_URL}/prof`);
    const teachers = await res.json();
    const container = document.getElementById("teacher-container");
    const select = document.getElementById("select-assign-teacher");
    container.innerHTML = "";
    select.innerHTML = "";

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "aucun professeur";
    select.appendChild(emptyOption);

    if (!teachers.length) {
        const p = document.createElement("p");
        p.textContent = "Aucun professeur disponible";
        container.append(p);
        return;
    }

    teachers.forEach((t) => {
        const row = document.createElement("div");
        row.className = "teacher-row";

        const info = document.createElement("span");
        info.textContent = `${t.name} <${t.email}> : ${t.nb_cours} cours`;

        const button = document.createElement("button");
        button.textContent = "Supprimer";
        button.onclick = () => deleteTeacher(t.id);

        row.append(info, button);
        container.appendChild(row);

        const option = document.createElement("option");
        option.value = t.id;
        option.textContent = t.name;
        select.appendChild(option);
    });
}

function assignTeacher() {
    const sigle = document.getElementById("input-assign-class").value;
    if (!sigle) return;
    const teacherId = document.getElementById("select-assign-teacher").value;
    const opts = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sigle, teacherId }),
    };
    fetch(`${SERVER_URL}/prof`, opts)
        .then((res) => res.text())
        .then((message) => {
            document.getElementById("span-assign-result").textContent = message;
            init();
        });
}

function deleteTeacher(id) {
    fetch(`${SERVER_URL}/prof/${id}`, { method: "DELETE" })
        .then(() => init());
}

window.onload = init;