const express = require( 'express' );
const router = express.Router();
const leadController = require( '../controllers/lead.controller' );

// Route to create a new lead
router.post( '/', leadController.createLead );

// Route to get all leads
router.get( '/', leadController.getAllLeads );

// Route to get all leads for exhibitor
router.get( '/exhibitor/:id', leadController.getAllExhibitorLeads );

// Route to get a lead by ID
router.get( '/:id', leadController.getLeadById );

// Route to update a lead by ID
router.put( '/:id', leadController.updateLead );

// Route to delete a lead by ID
router.delete( '/:id', leadController.deleteLead );

module.exports = router;