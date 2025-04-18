'use strict'
const { Model, DataTypes } = require( 'sequelize' )
const sequelize = require( '../config/config' )

class Expo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Expo.init( {
    active: DataTypes.BOOLEAN,
    expo_Client: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    start_Date: {
        type: DataTypes.DATE
    },
    year: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    expoFp_Id: {
        type: DataTypes.INTEGER
    },
    logoUrl_Color: {
        type: DataTypes.STRING
    },
    logoUrl_Black: {
        type: DataTypes.STRING
    },
    expoFp_MapUrl: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Expo'
} )

module.exports = Expo