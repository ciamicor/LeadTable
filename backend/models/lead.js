'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Lead.init( {
    expo_Year: DataTypes.INTEGER, // foreign key
    expo_Client: DataTypes.STRING, // foreign key
    attendee_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    scan_Company_Id: DataTypes.INTEGER, // foreign key
    name_First: DataTypes.STRING,
    name_Last: DataTypes.STRING,
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    employer: DataTypes.STRING,
    address: DataTypes.STRING,
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    comment: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Lead'
} )

export default Lead