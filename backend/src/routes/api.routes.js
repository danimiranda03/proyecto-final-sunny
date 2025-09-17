/**
 * @fileoverview Archivo principal de enrutamiento de la API.
 * Se encarga de centralizar y agrupar todas las rutas de la aplicación.
 *
 * @module api.routes
 */

const { Router } = require("express");
const router = Router();

/**
 * Importar las rutas relacionadas con los libros.
 * Todas las rutas definidas en `bolsas.routes.js` estarán disponibles bajo el prefijo `/api/bolsas`.
 * 
 * @example
 * // GET /api/bolsas
 * // POST /api/bolsas
 */
const bolsaRouter = require("./bolsas.routes");

// Asignar prefijo /bolsas a las rutas de libros
router.use("/bolsas", bolsaRouter);

/**
 * Exporta el módulo de rutas principales.
 * 
 * @type {import('express').Router}
 */
module.exports = router;