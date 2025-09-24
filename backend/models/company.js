'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

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
    expo_Year: DataTypes.INTEGER, // foreign key
    expo_Client: DataTypes.STRING, // foreign key
    lead_Ret: DataTypes.BOOLEAN,
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    login_URL: DataTypes.STRING,
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Company'
} )

export default Company