const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define('temperaments',{
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre : {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}