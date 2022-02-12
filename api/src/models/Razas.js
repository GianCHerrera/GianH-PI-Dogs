const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('razas', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alturaMaxima:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    pesoMaximo: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    alturaMinima:{
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    pesoMinimo: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    añosDeVida:{
      type: DataTypes.STRING,
      defaultValue: 'No Definido'
    },
    imagen:{
      type: DataTypes.TEXT,
      defaultValue: 'No Definido'
    },
    temperamentos:{
      type: DataTypes.STRING,
      defaultValue: 'No Definido'
    }
  });
};
