/** llamar el modelo */
const Bolsa = require("../models/bolsas.model");
const { Op } = require("sequelize");
/**Que muestra todas las registro de la base de datas */
const index = async (req, res) => {
  try {
    /**BUSCAR TODAS LAS REGISTRAS */

    const bolsas = await Bolsa.findAll({
      where: {
        is_active: 1,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Listado de bolsas de forma correcta",
      data: bolsas,
    });
  } catch (error) {
    console.error(`Sucedió un error al listar las bolsas: ${error}`);
    return res.status(500).json({
      status: true,
      message: `Sucedió un error al listar las bolsas: ${error}`,
    });
  }
};

/**Crear un nuevo registro */
const create = async (req, res) => {
  try {
    //validar si ya existe un bolsa con el mismo código
    const { code } = req.body;

    const bolsaExist = await Bolsa.findOne({
      where: { code },
    });

    console.log(bolsaExist);
    /**Validar si existe un bolsa con el mismo código */
    if (!bolsaExist) {
      /**CRear el registro */
      const bolsaCreate = await Bolsa.create(req.body, {});

      return res.status(201).json({
        status: true,
        message: "Bolsa creado de forma correcta",
      });
    } else {
      return res.status(409).json({
        status: false,
        message: `Bolsa ya existe con el mismo código: ${code}`,
      });
    }
  } catch (error) {
    console.error(`Sucedió un error al crear el bolsa: ${error}`);
    return res.status(500).json({
      status: false,
      message: `Sucedió un error al crear el bolsa: ${error}`,
    });
  }
};

/**MAstrar un resgistro en especifico */
const show = async (req, res) => {
  try {
    /**Realizar la busqueda del bolsa por su id */
    const { id } = req.params;
    const bolsaExist = await Bolsa.findByPk(id, {});

    if (bolsaExist) {
      return res.status(201).json({
        status: true,
        message: "Bolsa consultado de forma correcta",
        data: bolsaExist,
      });
    } else {
      return res.status(201).json({
        status: false,
        message: `Bolsa consultado con el id: ${id} no existe`,
        data: null,
      });
    }
  } catch (error) {
    console.error(`Sucedió un error al consultar el bolsa: ${error}`);
    return res.status(500).json({
      status: false,
      message: `Sucedió un error al consultar el bolsa: ${error}`,
    });
  }
};

/**Actualizar un registro especifico */
const update = async (req, res) => {
  try {
    /**Realizar la busqueda del bolsa por su id */
    const { id } = req.params;
    const { code } = req.body;
    const bolsaExist = await Bolsa.findOne({
      where: {
       
        id: id , // 👈 excluye el registro que se está actualizando
      },
    });
    console.log("Bolsa encontrado: ", bolsaExist);
    if (bolsaExist) {
      console.log("Entro a actualizar");

      const bolsaDuplicada = await Bolsa.findOne({
      where: {
        code: code,
        id: { [Op.ne]: id }, // 👈 excluye el registro que se está actualizando
      },
    });

    if (!bolsaDuplicada){
        /**Actualizar el bolsa */
      await bolsaExist.update(req.body, {
        where: {
          id: id,
        },
      });

      console.log("salio de actualizar actualizar");

      /**recuperar el registro actualizado */
      const bolsaUpdate = await Bolsa.findByPk(id, {});

      return res.status(201).json({
        status: true,
        message: "Bolsa actualizado de forma correcta",
        data: bolsaUpdate,
      });
    }
    else{
            return res.status(409).json({
        status: false,
        message: "Código ya usado en otra bolsa"
      });
    }
    
    } else {
      return res.status(201).json({
        status: false,
        message: "Bolsa no existe en base de datas..............",
        data: null,
      });
    }
  } catch (error) {
    console.error(`Sucedió un error al actualizar el bolsa: ${error}`);
    return res.status(500).json({
      status: false,
      message: `Sucedió un error al actualizar el bolsa: ${error}`,
    });
  }
};

/**Eliminar un registro especifico */
const destroy = async (req, res) => {
  try {
    /**Realizar la busqueda del bolsa por su id */
    const { id } = req.params;
    const bolsa = await Bolsa.findByPk(id, {});

    if (!bolsa) {
      return res.status(404).json({
        status: true,
        message: "Bolsa no existe en la base de datas",
      });
    } else {
      /**eliminar el registro */
      // await bolsa.destroy({});

      //actualización de estado

      await Bolsa.update(
        { is_active: 0 },
        {
          where: {
            id: id,
          },
        }
      );
      /**envio mensaje de eliminación */
      return res.status(201).json({
        status: true,
        message: "Bolsa inactivado de forma correcta",
      });
    }
  } catch (error) {
    console.error(`Sucedió un error al ELIMINAR el bolsa: ${error}`);
    return res.status(500).json({
      status: false,
      message: `Sucedió un error al eliminar el bolsa: ${error}`,
    });
  }
};

/**
 * Exporta todas las funciones del controlador para su uso en las rutas.
 *
 * @type {object}
 */
module.exports = {
  index,
  create,
  update,
  show,
  destroy,
};
