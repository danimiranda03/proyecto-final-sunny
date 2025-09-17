const { Model, DataTypes } = require("sequelize");
const sequelize = require("../models/database/dbconnection");

class Bolsa extends Model {}

Bolsa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(10),
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    color: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    medidas: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(),
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "Bolsa",
    tableName: "Bolsas",
    indexes: [
      {
        fields: ["code"],
        name: "idx_bolsas_code",
      },
      {
        fields: ["nombre"],
        name: "idx_bolsas_nombre",
      },
    ],
  }
);

/**Exportar el modelo */
module.exports = Bolsa;
