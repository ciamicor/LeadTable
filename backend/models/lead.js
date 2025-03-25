/*
'use strict';
const { Model } = require( 'sequelize' );

module.exports = ( sequelize, DataTypes ) => {
    class Lead extends Model {
        /!**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *!/
        static associate( models ) {
            // define association here
        }
    }

    Lead.init( {
        lead: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Lead',
    } );
    return Lead;
};*/

const Sequelize = require( 'sequelize' );
const db = require( '../config/db.config' );
const Lead = db.define( 'lead', {
    lead_FName: {
        type: Sequelize.STRING
    },
    lead_LName: {
        type: Sequelize.STRING
    },
    lead_Rating: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
} );
module.exports = Lead;