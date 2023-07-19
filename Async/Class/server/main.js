const express = require("express");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(cors());
const urlencodedParser = express.urlencoded({ extended: false });
app.use(express.json());

let courses = [
    { sigle: "INF2990", credits: 4 },
    { sigle: "LOG4420", credits: 3 },
    { sigle: "LOG1000", credits: 3 },
    { sigle: "MTH1102", credits: 2 },
];

app.get("/obtenirCours", function (req, res) {
    res.status(courses.length ? 200 : 404).send(courses);
});

app.get("/obtenirCours/:sigle", function (req, res) {
    const course = courses.find((c) => {
        return c.sigle === req.params.sigle;
    });
    if (!course) {
        res.status(404).send({ error: "Cours non trouvé" });
        return;
    }
    res.send(course);
});

app.post("/ajouterCours", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const course = { sigle: req.body.sigle, credits: Math.floor(Math.random() * 5 + 1) };
    if (courses.find(x => x.sigle === course.sigle)) {
        res.status(409).send({ error: `Cours ${course.sigle} déjà existant` });
        return;
    }
    courses.push(course);
    res.status(201).send(course.sigle + " a été ajouté");
});

app.delete("/supprimerCours/:sigle", function (req, res) {
    const size = courses.length;
    courses = courses.filter((c) => c.sigle !== req.params.sigle);
    if (size > courses.length) res.send("Cours supprimé.");
    else res.status(400).send("Echec de suppression : cours introuvable dans la liste");
});

app.patch("/modifierCours/", urlencodedParser, function (req, res) {
    const course = courses.find((c) => {
        return c.sigle === req.body.sigle;
    });
    if (!course) return res.status(404).send("Ce cours n'existe pas");
    course.credits = req.body.credits;
    res.send("Cours modifié");
});

app.listen(port);
