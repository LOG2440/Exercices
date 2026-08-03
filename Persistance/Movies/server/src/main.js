const express = require('express');
const cors = require('cors');
const movieRouter = require('./movieRouter');
const { seedDatabase } = require('./seed');

const app = express();
const PORT = 3000;

async function run() {
    try {
        await seedDatabase();
    } catch (error) {
        console.error("Erreur lors de l'import:", error.message);
        process.exit(1);
    }

    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
        console.log(`Requête reçue: ${req.method} ${req.url}`);
        console.log('Paramètres de requête:', req.query);
        next();
    });
    app.use('/movies', movieRouter);

    app.listen(PORT, () => {
        console.log(`Routes disponibles:`);
        console.log(`  GET http://localhost:${PORT}/movies/search`);
        console.log(`  GET http://localhost:${PORT}/movies/:id/genres`);
    });
}

run();
