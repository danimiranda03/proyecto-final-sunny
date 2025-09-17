/**
 * @fileoverview Punto de entrada principal de la aplicación.
 * Configura el servidor Express, las rutas de la API y la conexión a la base de datos con Sequelize.
 * 
 * @module server
 */

/** Importar el archivo de conexión a la base de datos */
const sequelize = require("./src/models/database/dbconnection");

/**Cargar el archivo de modelos */
require("./src/models/associations");



const express = require("express");
const app = express();


//--------------------
// Habilitar CORS para todos los dominios
//--------------------
const cors = require("cors");
app.use(cors());

/** 
 * Importar el archivo de rutas de la API.
 * Todas las rutas definidas en `api.routes.js` estarán disponibles bajo el prefijo `/api`.
 */
const routes = require("./src/routes/api.routes");

// Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(express.json());

// Prefijo base para las rutas de la API
app.use("/api", routes);

/**
 * Inicializa el servidor Express en el puerto 3000 y gestiona la conexión con la base de datos.
 * 
 * @function
 * @returns {void} No retorna ningún valor directamente; inicia el servidor y conecta la base de datos.
 * 
 * @example
 * // Iniciar servidor:
 * // node server.js
 * 
 * // Mensaje en consola:
 * // "Servidor ejecutándose de forma correcta en el puerto 3000"
 * // "Conectado con éxito a la base de datos"
 */
app.listen(3000, () => {
  console.log("Servidor ejecutándose de forma correcta en el puerto 3000");

  /** Conectar a la base de datos mediante Sequelize */
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Conectado con éxito a la base de datos");
    })
    .catch((error) => {
      console.error(`Error conectándose a la base de datos. El error es: ${error}`);
    });
});