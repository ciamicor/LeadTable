'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

class UploadAttendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

UploadAttendee.init( {
    expo_Year: DataTypes.INTEGER, // foreign key
    expo_Client: DataTypes.STRING, // foreign key
    upload_Title: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'uploadAttendee'
} )

export default UploadAttendee