const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    sequelize.define('temperament', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type : DataTypes.STRING,
            allowNull: false
        }
    },{timestamps: false})
};
