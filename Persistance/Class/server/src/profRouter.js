const router = require("express").Router();
const { courseManager, ready } = require('./courseManagerInstance');

const urlencodedParser = require('express').urlencoded({ extended: false });

ready.then(() => {

    router.get("/cours", async (req, res) => {
        const courses = await courseManager.getCoursesWithTeachers();
        res.status(courses.length ? 200 : 404).send(courses);
    });

    router.get("/", async (req, res) => {
        const teachers = await courseManager.getTeachers();
        res.status(teachers.length ? 200 : 404).send(teachers);
    });

    router.patch("/", urlencodedParser, async (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const { sigle, teacherId } = req.body;
        // une valeur vide retire le professeur assigné au cours
        const isAssigned = await courseManager.assignTeacher(sigle, teacherId || null);
        if (!isAssigned) {
            return res.status(404).send("Échec : cours introuvable ou professeur inexistant");
        }
        res.send("Professeur assigné");
    });

    router.delete("/:id", async (req, res) => {
        const isDeleted = await courseManager.deleteTeacher(req.params.id);
        if (!isDeleted) return res.status(404).send("Ce professeur n'existe pas");
        res.send("Professeur supprimé. Ses cours n'ont plus de professeur assigné.");
    });

});

module.exports = { router };
