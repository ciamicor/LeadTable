'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

class CustomField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

CustomField.init( {
        eventId: DataTypes.INTEGER,
        label: DataTypes.STRING,
        title: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        placeholder: DataTypes.STRING,
        options: DataTypes.JSON,
        htmlTag: DataTypes.STRING,
        type: DataTypes.STRING,
        required: DataTypes.BOOLEAN,
        eventYear: DataTypes.INTEGER,
        eventClient: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'CustomField'
    } )

export default CustomField