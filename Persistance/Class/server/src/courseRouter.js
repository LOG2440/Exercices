const router = require("express").Router();
const { courseManager, ready } = require('./courseManagerInstance');

const urlencodedParser = require('express').urlencoded({ extended: false });

ready.then(() => {

    router.get("/", async (req, res) => {
        const courses = await courseManager.getAllCourses();
        res.status(courses.length ? 200 : 404).send(courses);
    });

    router.get("/:sigle", async (req, res) => {
        const course = await courseManager.findCourse(req.params.sigle);
        if (!course) {
            res.status(404).send({ error: "Cours non trouvé" });
            return;
        }
        res.send(course);
    });

    router.post("/", urlencodedParser, async (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const sigle = req.body.sigle;
        const courseCreated = await courseManager.addCourse(sigle);
        if (!courseCreated) {
            return res.status(409).send({ error: `Cours ${sigle} déjà existant` });
        }

        res.status(201).send(sigle + " a été ajouté");
    });

    router.delete("/reset", async (req, res) => {
        const isDeleted = await courseManager.deleteAll();
        res.sendStatus(isDeleted ? 204 : 500);
    });

    router.delete("/:sigle", async (req, res) => {
        const isDeleted = await courseManager.deleteCourse(req.params.sigle);
        if (!isDeleted) {
            return res.status(400).send("Echec de suppression : cours introuvable dans la liste");
        }
        res.send("Cours supprimé.");
    });

    router.patch("/", urlencodedParser, async (req, res) => {
        const isModified = await courseManager.modifyCourse(req.body);
        if (!isModified) return res.status(404).send("Ce cours n'existe pas");
        res.send("Cours modifié");
    });

});

module.exports = { router };