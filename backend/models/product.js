'use strict'
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";

class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
        // define association here
    }
}

Product.init( {
    processorId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    eventClient: DataTypes.STRING,
    eventYear: DataTypes.INTEGER,
    name: DataTypes.STRING,
    shortName: DataTypes.STRING,
    price: DataTypes.DECIMAL( 10, 2 ),
    details: DataTypes.JSON,
    displayLocation: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Product'
} )

export default Product