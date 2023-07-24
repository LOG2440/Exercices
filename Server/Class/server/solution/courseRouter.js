const router = require("express").Router();
const CourseManager = require('./courseManager');
const courseManager = new CourseManager();

const urlencodedParser = require('express').urlencoded({ extended: false });

courseManager.readCoursesFromFile().then(() => {

    router.get("/obtenirCours", (req, res) => {
        res.status(courseManager.courses.length ? 200 : 404).send(courseManager.courses);
    });

    router.get("/obtenirCours/:sigle", async (req, res) => {
        const course = await courseManager.findCourse(req.params.sigle);
        if (!course) {
            res.status(404).send({ error: "Cours non trouvé" });
            return;
        }
        res.send(course);
    });

    router.post("/ajouterCours", urlencodedParser, async (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const sigle = req.body.sigle;
        const courseCreated = await courseManager.addCourse(sigle);
        if (!courseCreated) {
            return res.status(409).send({ error: `Cours ${sigle} déjà existant` });
        }

        res.status(201).send(sigle + " a été ajouté");
    });

    router.delete("/supprimerCours/:sigle", async (req, res) => {
        const isDeleted = await courseManager.deleteCourse(req.params.sigle);
        if (!isDeleted) {
            return res.status(400).send("Echec de suppression : cours introuvable dans la liste");
        }
        res.send("Cours supprimé.");
    });

    router.delete("/supprimerTout", async (req, res) => {
        const isDeleted = await courseManager.deleteAll();
        res.sendStatus(isDeleted ? 204 : 500);
    });

    router.patch("/modifierCours/", urlencodedParser, async (req, res) => {
        const isModified = await courseManager.modifyCourse(req.body);
        if (!isModified) return res.status(404).send("Ce cours n'existe pas");
        res.send("Cours modifié");
    });

});

module.exports = { router };