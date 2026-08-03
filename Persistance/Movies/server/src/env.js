// Configuration de la connexion à PostgreSQL.
// Complétez ces informations selon votre instance PostgreSQL.

const DB_CONFIG = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'log2440_films',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

module.exports = { DB_CONFIG };
