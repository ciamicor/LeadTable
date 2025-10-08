'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

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
    expo_Year: DataTypes.INTEGER, // foreign key
    expo_Client: DataTypes.STRING, // foreign key
    name_First: DataTypes.STRING,
    name_Last: DataTypes.STRING,
    title: DataTypes.STRING,
    contact_Email: DataTypes.STRING,
    contact_Phone: DataTypes.STRING,
    contact_Employer: DataTypes.STRING,
    address_Line1: DataTypes.STRING,
    address_Line2: DataTypes.STRING,
    address_City: DataTypes.STRING,
    address_State: DataTypes.STRING,
    address_Zip: DataTypes.CHAR,
    address_Country: DataTypes.STRING,
    reg_Type: DataTypes.STRING,
    tech_Sem: DataTypes.STRING,
    upload_Id: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'Attendee'
} )

export default Attendee