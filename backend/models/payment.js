'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Payment.init( {
    nameFirst: DataTypes.STRING,
    nameLast: DataTypes.STRING,
    attendeeId: DataTypes.INTEGER,
    payerEmail: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    eventClient: DataTypes.STRING,
    eventYear: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    processorId: DataTypes.INTEGER,
    paymentSuccess: DataTypes.BOOLEAN,
    details: DataTypes.JSON,
    isSandbox: DataTypes.BOOLEAN,

}, {
    sequelize,
    modelName: 'Payment'
} )

export default Payment