'use strict';
const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/config' );

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
    expo_Active: DataTypes.BOOLEAN,
    expo_Year: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'Expo',
} );

module.exports = Expo;