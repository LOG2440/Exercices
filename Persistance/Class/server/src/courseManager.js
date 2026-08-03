const fsPromises = require('fs').promises;
const path = require('path');

class CourseManager {
    constructor() {
        this.courses = [];
        this.path = path.join(__dirname + "../../data/courses.json");
    }

    async init() {
        try {
            const courses = await fsPromises.readFile(this.path);
            this.courses = JSON.parse(courses);
        }
        catch (e) {
            console.log(`Aucun fichier trouvé. Chargement d'une liste vide`);
            this.courses = [];
        }
        finally {
            return this.courses;
        }
    }

    async saveCoursesToFile() {
        await fsPromises.writeFile(this.path, JSON.stringify(this.courses, null, 4));
    }

    async getAllCourses() {
        return this.courses;
    }

    findCourse(sigle) {
        return this.courses.find((c) => {
            return c.sigle === sigle;
        });
    }

    async addCourse(sigle) {
        const course = { sigle, credits: Math.floor(Math.random() * 5 + 1) };
        if (this.courses.find(x => x.sigle === course.sigle)) {
            return false;
        }
        this.courses.push(course);
        await this.saveCoursesToFile();
        return true;
    }

    async deleteCourse(sigle) {
        const size = this.courses.length;
        this.courses = this.courses.filter((c) => c.sigle !== sigle);
        await this.saveCoursesToFile();
        return size > this.courses.length;
    }

    async modifyCourse(modifiedCourse) {
        const course = this.courses.find((c) => {
            return c.sigle === modifiedCourse.sigle;
        });
        if (!course) return false;
        course.credits = modifiedCourse.credits;
        await this.saveCoursesToFile();
        return true;
    }

    async deleteAll() {
        try {
            await fsPromises.unlink(this.path);
            this.courses = [];
            return true;
        }
        catch (e) {
            console.log('Erreur de suppression');
            return false;
        }
    }

    // Les méthodes suivantes n'ont pas d'équivalent avec la persistance dans un fichier JSON :
    // il n'y a pas de professeurs dans courses.json. Elles font partie du travail à compléter
    // et retournent des valeurs vides tant qu'elles ne sont pas implémentées avec PostgreSQL.

    /**
     * Retourne tous les cours avec le nom de leur professeur (ou null s'il n'y en a pas).
     * @returns {Promise<Array<{sigle: string, credits: number, professeur: string|null}>>}
     */
    async getCoursesWithTeachers() {
        // TODO : implémenter avec une relation entre courses et teachers
        return [];
    }

    /**
     * Retourne tous les professeurs avec leur nombre de cours.
     * @returns {Promise<Array<{id: number, name: string, email: string, nb_cours: number}>>}
     */
    async getTeachers() {
        // TODO : implémenter la récupération des professeurs
        return [];
    }

    /**
     * Assigne un professeur à un cours. `teacherId` à null retire le professeur du cours.
     * @param {string} sigle sigle du cours à modifier
     * @param {number|null} teacherId identifiant du professeur
     * @returns {Promise<boolean>} true si le cours a été modifié
     */
    async assignTeacher(sigle, teacherId) {
        // TODO : implémenter en considérant les relations entre les tables.
        return false;
    }

    /**
     * Supprime un professeur. Ses cours sont conservés, mais n'ont plus de professeur assigné.
     * @param {number} id identifiant du professeur à supprimer
     * @returns {Promise<boolean>} true si le professeur a été supprimé
     */
    async deleteTeacher(id) {
        // TODO : implémenter la suppression d'un professeur
        return false;
    }

}

module.exports = CourseManager;
