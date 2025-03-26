const express = require( 'express' );
const router = express.Router();
const companyController = require( '../controllers/company.controller' );

// Route to get all leads
router.get( '/', companyController.getAllCompanies );

// Route to create a new lead
router.post( '/', companyController.createCompany );

// Route to get a lead by ID
router.get( '/:id', companyController.getCompanyById );

// Route to update a lead by ID
router.put( '/:id', companyController.updateCompany );

// Route to delete a lead by ID
router.delete( '/:id', companyController.deleteCompany );

module.exports = router;