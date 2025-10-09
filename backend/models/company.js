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
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    expoId: DataTypes.INTEGER,
    expo_Client: DataTypes.STRING, // foreign key
    expo_Year: DataTypes.INTEGER, // foreign key
    login_URL: DataTypes.STRING,
    name: DataTypes.STRING,
    lead_Ret: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: 'Company'
} )

export default Company