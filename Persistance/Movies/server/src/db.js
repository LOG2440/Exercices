const { Pool, types } = require('pg');
const { DB_CONFIG } = require('./env');

// Par défaut, le pilote `pg` retourne les BIGINT sous forme de chaîne de caractères pour éviter
// toute perte de précision. Les valeurs de `budget` et `box_office` tiennent dans un nombre
// JavaScript : on les convertit pour que la réponse JSON contienne des nombres et non des chaînes.
types.setTypeParser(types.builtins.INT8, (value) => parseInt(value, 10));

const pool = new Pool(DB_CONFIG);

module.exports = { pool };
