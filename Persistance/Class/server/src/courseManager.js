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

}

module.exports = CourseManager;