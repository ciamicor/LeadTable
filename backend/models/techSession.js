'use strict'
const { Model, DataTypes } = require( 'sequelize' )
const sequelize = require( '../config/config' )

class TechSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

TechSession.init( {
    expo_Year: DataTypes.INTEGER, // foreign key
    expo_Client: DataTypes.STRING, // foreign key
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    time_Start: DataTypes.TIME,
    time_End: DataTypes.TIME,
    location: DataTypes.STRING,
    track: DataTypes.STRING,
    about: DataTypes.CHAR,
    objectives: DataTypes.CHAR
}, {
    sequelize,
    modelName: 'TechSession'
} )

module.exports = TechSession