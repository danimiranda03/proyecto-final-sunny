/**
 * @fileoverview Configuración y conexión a la base de datos mediante Sequelize.
 * Este archivo inicializa la conexión con la base de datos MySQL y exporta la instancia para su uso en toda la aplicación.
 * 
 * @module dbconnection
 */

const { Sequelize } = require("sequelize");

/**
 * Instancia de Sequelize configurada para conectarse a la base de datos MySQL.
 * 
 * @constant
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  "bolsas", // Nombre de la base de datos
  "root",    // Usuario de la base de datos
  "",        // Contraseña del usuario de base de datos
  {
    host: "localhost", // Servidor de la base de datos
    dialect: "mysql",  // Tipo de base de datos
  }
);

module.exports = sequelize;