-- Schéma de la base de données du moteur de recherche de films.
-- L'ordre des suppressions suit les dépendances : une table référencée en dernier.
DROP TABLE IF EXISTS movie_genres;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS directors;

CREATE TABLE directors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  year INTEGER NOT NULL,
  -- un film a obligatoirement un réalisateur : NOT NULL
  director_id INTEGER NOT NULL REFERENCES directors(id),
  country VARCHAR(100) NOT NULL,
  language VARCHAR(50) NOT NULL,
  runtime INTEGER NOT NULL,
  imdb_rating DOUBLE PRECISION NOT NULL,
  budget BIGINT,
  box_office BIGINT,
  release_date TIMESTAMPTZ NOT NULL
);

CREATE TABLE movie_genres (
  movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
  -- clé primaire composée : une même paire (film, genre) ne peut pas être insérée deux fois
  PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO directors (name) VALUES
('Wachowski Sisters'),
('Frank Darabont'),
('Quentin Tarantino'),
('Christopher Nolan'),
('Hayao Miyazaki'),
('Akira Kurosawa'),
('Michael Curtiz'),
('James Cameron');

INSERT INTO genres (name) VALUES
('Action'),
('Adventure'),
('Animation'),
('Crime'),
('Drama'),
('Family'),
('Fantasy'),
('Romance'),
('Sci-Fi'),
('Thriller'),
('War');

INSERT INTO movies (title, year, director_id, country, language, runtime, imdb_rating, budget, box_office, release_date) VALUES
('The Matrix', 1999, 1, 'USA', 'English', 136, 8.7, 63000000, 467222824, '1999-03-31T00:00:00.000Z'),
('The Shawshank Redemption', 1994, 2, 'USA', 'English', 142, 9.3, 25000000, 16000000, '1994-09-23T00:00:00.000Z'),
('Pulp Fiction', 1994, 3, 'USA', 'English', 154, 8.9, 8000000, 214179088, '1994-10-14T00:00:00.000Z'),
('Inception', 2010, 4, 'USA', 'English', 148, 8.8, 160000000, 836836967, '2010-07-16T00:00:00.000Z'),
('Spirited Away', 2001, 5, 'Japan', 'Japanese', 125, 9.3, 19000000, 347789262, '2001-07-20T00:00:00.000Z'),
('Interstellar', 2014, 4, 'USA', 'English', 169, 8.6, 165000000, 701729206, '2014-11-07T00:00:00.000Z'),
('Seven Samurai', 1954, 6, 'Japan', 'Japanese', 207, 9, 500000, 269061, '1954-04-26T00:00:00.000Z'),
('Casablanca', 1942, 7, 'USA', 'English', 102, 8.5, 1039000, 1373000, '1942-11-26T00:00:00.000Z'),
('Avatar', 2009, 8, 'USA', 'English', 162, 7.9, 237000000, 2923706026, '2009-12-18T00:00:00.000Z');

INSERT INTO movie_genres (movie_id, genre_id) VALUES
(1, 1),
(1, 9),
(2, 5),
(3, 4),
(3, 5),
(4, 1),
(4, 9),
(4, 10),
(5, 3),
(5, 6),
(5, 7),
(6, 2),
(6, 5),
(6, 9),
(7, 1),
(7, 5),
(8, 5),
(8, 8),
(8, 11),
(9, 1),
(9, 2),
(9, 7);
