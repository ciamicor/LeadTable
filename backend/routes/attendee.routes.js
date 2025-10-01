const express = require( 'express' )
const router = express.Router()
const attendeeController = require( '../controllers/attendee.controller' )

// Create a new attendee
router.post( '/', attendeeController.createAttendee )

// Get all Attendees
router.get( '/', attendeeController.getAllAttendees )

// Get Attendees by Expo
router.get( '/client/:client/year/:year', attendeeController.getExpoAttendees )

// Get Attendees created between dates
router.get( '/start/:startDate/end/:endDate', attendeeController.getAttendeesBetweenDates )

// Get Attendee by ID
router.get( '/:id', attendeeController.getAttendeeById )

// Get Attendee by Upload ID
router.get( '/upload/:id', attendeeController.getAttendeeByUploadId )

// Update an Attendee by ID
router.put( '/:id', attendeeController.updateAttendee )

// Delete Attendee by ID
router.delete( '/:id', attendeeController.deleteAttendee )

module.exports = router