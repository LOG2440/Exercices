const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');
const { seedDatabase } = require('../src/seed');

// Ces tests valident l'implémentation de searchMovies dans movieManager.js à travers la route
// GET /movies/search. Ils reproduisent les combinaisons de paramètres décrites dans TESTS.md.
//
// Ils s'exécutent contre une vraie base PostgreSQL (celle configurée dans env.js) : la base est
// réinitialisée avec les données de test avant de lancer les tests, comme au démarrage du serveur.

beforeAll(async () => {
    console.log = jest.fn(); // supprime les logs de la console pendant les tests
    console.error = jest.fn(); // supprime les logs d'erreur de la console pendant les tests
    await seedDatabase();
}, 30000);

afterAll(async () => {
    await pool.end();
});

const search = (query) => request(app).get('/movies/search').query(query);

const titlesOf = (movies) => movies.map((movie) => movie.title);

describe('GET /movies/search - tests de base', () => {
    it('retourne tous les films quand aucun paramètre n\'est fourni', async () => {
        const res = await search({});
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(9);
    });

    it('filtre par année exacte', async () => {
        const res = await search({ year: '1999' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body)).toEqual(['The Matrix']);
    });

    it('filtre par plage d\'années', async () => {
        const res = await search({ yearFrom: '1990', yearTo: '2000' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body).sort()).toEqual(
            ['The Matrix', 'The Shawshank Redemption', 'Pulp Fiction'].sort()
        );
    });
});

describe('GET /movies/search - tests de filtres', () => {
    it('filtre par genre unique', async () => {
        const res = await search({ genre: 'Action' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body).sort()).toEqual(
            ['The Matrix', 'Inception', 'Seven Samurai', 'Avatar'].sort()
        );
    });

    it('filtre par plusieurs genres (OU logique)', async () => {
        const res = await search({ genre: 'Action,Sci-Fi' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body).sort()).toEqual(
            ['The Matrix', 'Inception', 'Interstellar', 'Seven Samurai', 'Avatar'].sort()
        );
    });

    it('filtre par réalisateur avec recherche partielle', async () => {
        const res = await search({ director: 'Nolan' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body).sort()).toEqual(['Inception', 'Interstellar'].sort());
    });

    it('filtre par note IMDB minimum', async () => {
        const res = await search({ minRating: '9.0' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body).sort()).toEqual(
            ['The Shawshank Redemption', 'Spirited Away', 'Seven Samurai'].sort()
        );
    });
});

describe('GET /movies/search - tests de tri', () => {
    it('trie par note décroissante', async () => {
        const res = await search({ sortBy: 'imdbRating', sortOrder: 'desc' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(9);
        expect(res.body[0].title).toBe('The Shawshank Redemption');
        expect(res.body[res.body.length - 1].title).toBe('Avatar');
    });

    it('trie par année croissante', async () => {
        const res = await search({ sortBy: 'year', sortOrder: 'asc' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(9);
        expect(res.body[0].title).toBe('Casablanca');
        expect(res.body[res.body.length - 1].title).toBe('Interstellar');
    });

    it('trie par box office décroissant', async () => {
        const res = await search({ sortBy: 'boxOffice', sortOrder: 'desc' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(9);
        expect(res.body[0].title).toBe('Avatar');
        expect(res.body[res.body.length - 1].title).toBe('Seven Samurai');
    });
});

describe('GET /movies/search - tests de sélection des colonnes', () => {
    it('inclut seulement les champs demandés', async () => {
        const res = await search({ fields: 'title,year,imdbRating' });
        expect(res.status).toBe(200);
        res.body.forEach((movie) => {
            expect(Object.keys(movie).sort()).toEqual(['imdbRating', 'title', 'year'].sort());
        });
    });

    it('exclut les champs demandés', async () => {
        const res = await search({ fields: '-budget,-boxOffice' });
        expect(res.status).toBe(200);
        res.body.forEach((movie) => {
            expect(movie).not.toHaveProperty('budget');
            expect(movie).not.toHaveProperty('boxOffice');
            expect(movie).not.toHaveProperty('id');
        });
    });

    it('combine un filtre avec une sélection de champs', async () => {
        const res = await search({ country: 'Japan', fields: 'title,director,year' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        res.body.forEach((movie) => {
            expect(Object.keys(movie).sort()).toEqual(['director', 'title', 'year'].sort());
        });
        expect(titlesOf(res.body).sort()).toEqual(['Spirited Away', 'Seven Samurai'].sort());
    });
});

describe('GET /movies/search - tests complexes', () => {
    it('combine langue, note minimum et durée maximum', async () => {
        const res = await search({ language: 'Japanese', minRating: '8.0', maxRuntime: '180' });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body)).toEqual(['Spirited Away']);
    });

    it('combine genre, plage d\'années, note minimum, tri et champs', async () => {
        const res = await search({
            genre: 'Action',
            yearFrom: '2005',
            minRating: '8.0',
            sortBy: 'imdbRating',
            sortOrder: 'desc',
            fields: 'title,year,imdbRating,director'
        });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body)).toEqual(['Inception']);
    });

    it('combine réalisateur, budget minimum et tri par box office', async () => {
        const res = await search({
            director: 'Nolan',
            minBudget: '162500000',
            sortBy: 'boxOffice',
            sortOrder: 'desc',
            fields: 'title,budget,boxOffice'
        });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body)).toEqual(['Interstellar']);
    });

    it('combine durée minimum, pays, note minimum et tri par durée', async () => {
        const res = await search({
            minRuntime: '150',
            country: 'USA',
            minRating: '8.0',
            sortBy: 'runtime',
            sortOrder: 'desc',
            fields: 'title,runtime,imdbRating'
        });
        expect(res.status).toBe(200);
        expect(titlesOf(res.body)).toEqual(['Interstellar', 'Pulp Fiction']);
    });
});

describe('GET /movies/search - cas limites et injection SQL', () => {
    it('refuse un champ de tri qui n\'existe pas', async () => {
        const res = await search({ sortBy: 'password' });
        expect(res.status).toBe(400);
    });

    it('refuse une tentative d\'injection à travers le tri, sans supprimer la table', async () => {
        const res = await search({ sortBy: 'year;DROP TABLE movies--' });
        expect(res.status).toBe(400);

        const followUp = await search({});
        expect(followUp.status).toBe(200);
        expect(followUp.body).toHaveLength(9);
    });

    it('refuse une tentative d\'injection à travers les colonnes retournées', async () => {
        const res = await search({ fields: 'title,(SELECT 1)' });
        expect(res.status).toBe(400);
    });

    it('refuse de combiner inclusion et exclusion de champs', async () => {
        const res = await search({ fields: 'title,-budget' });
        expect(res.status).toBe(400);
    });

    it('refuse une valeur numérique invalide', async () => {
        const res = await search({ minRating: 'abc' });
        expect(res.status).toBe(400);
    });

    it('retourne un tableau vide si aucun film ne correspond', async () => {
        const res = await search({ year: '1800' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('traite la valeur recherchée comme du texte et non comme du SQL', async () => {
        const res = await search({ director: "%' OR '1'='1" });
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('ne tronque pas la liste des genres retournés par le filtre', async () => {
        const res = await search({ genre: 'Action', fields: 'title,genre' });
        expect(res.status).toBe(200);

        const genresByTitle = Object.fromEntries(res.body.map((movie) => [movie.title, movie.genre]));
        expect(genresByTitle).toEqual({
            'The Matrix': ['Action', 'Sci-Fi'],
            Inception: ['Action', 'Sci-Fi', 'Thriller'],
            'Seven Samurai': ['Action', 'Drama'],
            Avatar: ['Action', 'Adventure', 'Fantasy']
        });
    });
});
