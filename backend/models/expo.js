'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

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
    id: DataTypes.INTEGER,
    expo_Client: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    expo_Year: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    clientFull: {
        type: DataTypes.STRING
    },
    start_Date: {
        type: DataTypes.DATE
    },
    expoFp_Id: {
        type: DataTypes.INTEGER
    },
    expoFp_MapUrl: {
        type: DataTypes.STRING
    },
    expoFp_Token: {
        type: DataTypes.STRING
    },
    paymentEnabled: { type: Boolean },
    logoUrl_Color: {
        type: DataTypes.STRING
    },
    logoUrl_Black: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'Expo'
} )

export default Expo