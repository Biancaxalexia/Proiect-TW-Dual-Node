const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configurarea conexiunii la baza de date
const sequelize = new Sequelize(
  // Preluarea setărilor de conectare din fișierul .env.
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    logging: false,

// Dezactivarea autentificării GSSAPI pe Windows
// Unele versiuni ale acestui serviciu încearcă automat autentificarea prin GSSAPI, ceea ce pe Windows poate provoca erori
// Astfel, prin această funcție forțăm Sequelize să utilizeze pentru autentificare username-ul și parola setată
    dialectOptions: {
      authPlugins: {
        auth_gssapi_client: () => {
          throw new Error("GSSAPI dezactivat");
        }
      }
    }
  }
);

module.exports = sequelize;

