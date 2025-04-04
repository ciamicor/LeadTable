'use strict';
const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/config' );

class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Attendee.init( {
    // expo_Year // foreign key
    name_First: DataTypes.STRING,
    name_Last: DataTypes.STRING,
    contact_Email: DataTypes.STRING,
    contact_Phone: DataTypes.STRING,
    contact_Employer: DataTypes.STRING,
    reg_Type: DataTypes.STRING,
    tech_Sem: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: 'Attendee',
} );

module.exports = Attendee;