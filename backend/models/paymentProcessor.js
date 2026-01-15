'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

class PaymentProcessor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

PaymentProcessor.init( {
    eventId: DataTypes.INTEGER,
    eventClient: DataTypes.STRING,
    processorClientIds: DataTypes.JSON,
    processorName: DataTypes.STRING,
    enableSandbox: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: 'PaymentProcessor'
} )

export default PaymentProcessor