import express from 'express';

const router = express.Router()
import * as uploadAttendeeController from '../controllers/uploadAttendee.controller.js'

// Route to create an Upload
router.post( '/', uploadAttendeeController.createUpload )

// Route to get all Uploads by client
router.get( '/client/:client', uploadAttendeeController.getAllAttendeeUploads_Client )

// Route to get an Upload by ID
router.get( '/:id', uploadAttendeeController.getAttendeeUpload )

export default router