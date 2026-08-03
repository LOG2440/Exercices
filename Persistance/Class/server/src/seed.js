// Script d'initialisation de la base de données.
// Exécute le contenu de db/postgres.sql

const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');
const { DB_CONFIG } = require('./env');

async function seed() {
    const pool = new Pool(DB_CONFIG);
    try {
        const sql = await fs.readFile(path.join(__dirname, '../db/postgres.sql'), 'utf8');
        await pool.query(sql);
        console.log('Base de données initialisée avec succès');
    } catch (e) {
        console.error("Erreur lors de l'initialisation de la base de données :", e.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

seed();
