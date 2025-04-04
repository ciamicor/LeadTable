'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up( queryInterface, Sequelize ) {
        await queryInterface.createTable( 'leads', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            lead_FName: {
                type: Sequelize.STRING
            },
            lead_LName: {
                type: Sequelize.STRING
            },
            lead_Rating: {
                type: Sequelize.INTEGER
            },
            scannedBy_Company: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        } );
    },
    async down( queryInterface, Sequelize ) {
        await queryInterface.dropTable( 'leads' );
    }
};