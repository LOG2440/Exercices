-- Schéma de la base de données du gestionnaire de cours.
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS teachers;

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  sigle VARCHAR(10) NOT NULL UNIQUE,
  credits INTEGER NOT NULL,
  -- La colonne accepte NULL : un cours peut ne pas avoir de professeur assigné.
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

INSERT INTO teachers (name, email) VALUES
('Alice Martin', 'alice.martin@example.ca'),
('Robert Tremblay', 'robert.tremblay@example.ca'),
('Chloé Dubois', 'chloe.dubois@example.ca');

INSERT INTO courses (sigle, credits, teacher_id) VALUES
('INF2990', 4, 1),
('LOG4420', 3, 2),
('LOG1000', 3, 1),
('MTH1102', 2, NULL); -- aucun professeur assigné
