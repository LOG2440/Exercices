const express = require('express');
const { searchMovies, getMovieGenres } = require('./movieManager');
// const { searchMovies, getMovieGenres } = require('./movieManager.solution');

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const results = await searchMovies(req.query);
    res.json(results);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(400).json({
      error: 'Erreur lors de la recherche',
      message: error.message
    });
  }
});

router.get('/:id/genres', async (req, res) => {
  const movieId = Number(req.params.id);
  if (!Number.isInteger(movieId)) {
    return res.status(400).json({ error: `Identifiant de film invalide : ${req.params.id}` });
  }

  try {
    const genres = await getMovieGenres(movieId);
    res.json(genres);
  } catch (error) {
    console.error('Erreur lors de la récupération des genres:', error);
    res.status(400).json({
      error: 'Erreur lors de la récupération des genres',
      message: error.message
    });
  }
});

module.exports = router;
