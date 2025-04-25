'use strict'
const { Model, DataTypes } = require( 'sequelize' )
const sequelize = require( '../config/config' )

class Scan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Scan.init( {
    // expo_Year      // foreign key
    // company_Id   // foreign key
    // lead_Id      // foreign key
    lead_Score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    company_Comments: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Scan'
} )

module.exports = Scan