'use strict';
const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/config' );

class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Company.init( {
    // expo_Id // foreign key
    company_Name: DataTypes.STRING,
    company_Email: DataTypes.STRING,
    company_Web: DataTypes.STRING,
    company_Phone: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Company',
} );

module.exports = Company;