const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Razas', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    añosDeVida:{
      type: DataTypes.INTEGER,
    }
  });
};
