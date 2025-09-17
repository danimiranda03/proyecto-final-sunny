/**Inicializar el enrutador de express */
const { Router } = require("express");

const router = Router();

/**Importar el controlador donde estan las funcionales a enrutar */
const { index, create, update, show, destroy} = require("../controllers/bolsa.controller");

/**Ruta para mostrar todos los registros */
router.get("/", index);

/**Ruta para crear un registro */
router.post("/", create);

/**Ruta para mostrar un registro */
router.get("/:id", show);

/** Ruta para actualizar un registro*/
router.put("/:id", update);

/**Ruta para eliminar un registro */
router.delete("/:id", destroy);

/**Exportar las rutas */
module.exports = router;