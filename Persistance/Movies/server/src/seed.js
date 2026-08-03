// Script d'initialisation de la base de données.
// Exécute le contenu de db/postgres.sql : suppression des tables, création des tables et
// insertion des films. Appelé au démarrage du serveur et par la commande `npm run seed`.

const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function seedDatabase() {
  const sql = fs.readFileSync(path.join(__dirname, '../db/postgres.sql'), 'utf8');
  await pool.query(sql);
  console.log('Base de données initialisée : tables recréées et films importés');
}

module.exports = { seedDatabase };

// Permet d'exécuter ce fichier directement avec `npm run seed`
if (require.main === module) {
  seedDatabase()
    .catch((error) => {
      console.error("Erreur lors de l'initialisation :", error.message);
      process.exitCode = 1;
    })
    .finally(() => pool.end());
}
