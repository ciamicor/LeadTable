const express = require( 'express' );
const router = express.Router();
const companyController = require( '../controllers/company.controller' );

// Route to create a new company
router.post( '/', companyController.createCompany );

// Route to get all companies
router.get( '/', companyController.getAllCompanies );

// Route to get a company by ID
router.get( '/:id', companyController.getCompanyById );

module.exports = router;