const { Pool } = require('pg');
const { DB_CONFIG } = require('./env');

class CourseManager {

    constructor() {
        this.pool = null;
    }

    async init() {
        try {
            this.pool = new Pool(DB_CONFIG);
        }
        catch (e) {
            console.error(e);
        }
    }

    async getAllCourses() {
        // On ne veut pas envoyer la colonne `id` au client.
        const result = await this.pool.query("SELECT sigle, credits FROM courses ORDER BY sigle");
        return result.rows;
    }

    async findCourse(sigle) {
        const result = await this.pool.query("SELECT sigle, credits FROM courses WHERE sigle = $1", [sigle]);
        return result.rows[0];
    }

    async addCourse(sigle) {
        const credits = Math.floor(Math.random() * 5 + 1);
        // La contrainte UNIQUE sur `sigle` empêche les doublons.
        // ON CONFLICT DO NOTHING évite de lancer une erreur : rowCount vaut alors 0.
        const result = await this.pool.query(
            `INSERT INTO courses (sigle, credits) VALUES ($1, $2)
             ON CONFLICT (sigle) DO NOTHING
             RETURNING sigle, credits`,
            [sigle, credits]);
        return result.rowCount > 0;
    }

    async deleteCourse(sigle) {
        const result = await this.pool.query("DELETE FROM courses WHERE sigle = $1", [sigle]);
        return result.rowCount;
    }

    async modifyCourse(modifiedCourse) {
        const result = await this.pool.query(
            "UPDATE courses SET credits = $1 WHERE sigle = $2 RETURNING sigle, credits",
            [modifiedCourse.credits, modifiedCourse.sigle]);
        return result.rowCount;
    }

    async deleteAll() {
        try {
            await this.pool.query("DELETE FROM courses");
            return true;
        }
        catch (e) {
            console.log('Erreur de suppression');
            return false;
        }
    }

    async getCoursesWithTeachers() {
        // LEFT JOIN : les cours sans professeur sont conservés avec la valeur NULL.
        // Un INNER JOIN retirerait MTH1102 du résultat.
        const result = await this.pool.query(`
            SELECT courses.sigle, courses.credits, teachers.name AS professeur
            FROM courses
            LEFT JOIN teachers ON teachers.id = courses.teacher_id
            ORDER BY courses.sigle`);
        return result.rows;
    }

    async getTeachers() {
        // Le cast ::INTEGER évite que le BIGINT retourné par COUNT() soit reçu comme une chaîne.
        const result = await this.pool.query(`
            SELECT teachers.id, teachers.name, teachers.email, COUNT(courses.id)::INTEGER AS nb_cours
            FROM teachers
            LEFT JOIN courses ON courses.teacher_id = teachers.id
            GROUP BY teachers.id, teachers.name, teachers.email
            ORDER BY nb_cours DESC, teachers.name`);
        return result.rows;
    }

    async assignTeacher(sigle, teacherId) {
        try {
            const result = await this.pool.query(
                "UPDATE courses SET teacher_id = $1 WHERE sigle = $2 RETURNING sigle, teacher_id",
                [teacherId, sigle]);
            return result.rowCount > 0;
        }
        catch (e) {
            // La contrainte de clé étrangère refuse un teacher_id qui n'existe pas dans `teachers`.
            return false;
        }
    }

    async deleteTeacher(id) {
        try {
            // Grâce à ON DELETE SET NULL, les cours du professeur sont conservés avec teacher_id = NULL.
            // Sans cette contrainte, PostgreSQL refuserait la suppression pour éviter des données orphelines.
            const result = await this.pool.query("DELETE FROM teachers WHERE id = $1", [id]);
            return result.rowCount > 0;
        }
        catch (e) {
            return false;
        }
    }

}

module.exports = CourseManager;
