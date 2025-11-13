'use strict'
const { Model, DataTypes } = require( 'sequelize' )
const sequelize = require( '../config/config' )

class ExpoSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

ExpoSettings.init( {
    active: DataTypes.BOOLEAN,
    eventId: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'EventSettings'
} )

module.exports = ExpoSettings