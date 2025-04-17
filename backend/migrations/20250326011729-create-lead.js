'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize ) {
    await queryInterface.createTable( 'Leads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lead_Fname: {
        type: Sequelize.STRING
      },
      lead_Lname: {
        type: Sequelize.STRING
      },
      lead_Rating: {
        type: Sequelize.INTEGER
      },
      year: {
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
    } )
  },
  async down( queryInterface, Sequelize ) {
    await queryInterface.dropTable( 'Leads' )
  }
}