const express = require( 'express' );
const router = express.Router();
const attendeeController = require( '../controllers/attendee.controller' );

// Route to create a new lead
router.post( '/', attendeeController.createAttendee );

// Route to get all leads
router.get( '/', attendeeController.getAllAttendees );

// Route to get a lead by ID
router.get( '/:id', attendeeController.getAttendeeById );

// Route to update a lead by ID
router.put( '/:id', attendeeController.updateAttendee );

// Route to delete a lead by ID
router.delete( '/:id', attendeeController.deleteAttendee );

module.exports = router;