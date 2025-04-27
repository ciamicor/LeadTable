const express = require( 'express' )
const router = express.Router()
const uploadAttendeeController = require( '../controllers/uploadAttendee.controller' )

// Route to create an Upload
router.post( '/', uploadAttendeeController.createUpload )

// Route to get all Uploads by client
router.get( '/client/:client', uploadAttendeeController.getAllAttendeeUploads_Client )

// Route to get an Upload by ID
router.get( '/:id', uploadAttendeeController.getAttendeeUpload )

module.exports = router