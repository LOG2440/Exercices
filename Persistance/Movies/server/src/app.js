const express = require('express');
const cors = require('cors');
const movieRouter = require('./movieRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Requête reçue: ${req.method} ${req.url}`);
    console.log('Paramètres de requête:', req.query);
    next();
});
app.use('/movies', movieRouter);

module.exports = app;
