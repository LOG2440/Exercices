const { seedDatabase } = require('./seed');
const app = require('./app');

const PORT = 3000;

async function run() {
    try {
        await seedDatabase();
    } catch (error) {
        console.error("Erreur lors de l'import:", error.message);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Routes disponibles:`);
        console.log(`  GET http://localhost:${PORT}/movies/search`);
        console.log(`  GET http://localhost:${PORT}/movies/:id/genres`);
    });
}

run();
