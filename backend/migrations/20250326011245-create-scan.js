'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize ) {
    await queryInterface.createTable( 'Scans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scannedBy_CompanyId: {
        type: Sequelize.INTEGER
      },
      lead_id: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } )
  },
  async down( queryInterface, Sequelize ) {
    await queryInterface.dropTable( 'Scans' )
  }
}