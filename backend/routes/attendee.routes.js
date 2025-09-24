import express from "express"

const router = express.Router()
import * as attendeeController from "../controllers/attendee.controller.js";

// Route to create a new attendee
router.post( '/', attendeeController.createAttendee )

// Route to get all Attendees
router.get( '/', attendeeController.getAllAttendees )

// Get Attendees by Expo
router.get( '/client/:client/year/:year', attendeeController.getExpoAttendees )

// Route to get an Attendee by ID
router.get( '/:id', attendeeController.getAttendeeById )

// Route to get an Attendee by Upload ID
router.get( '/upload/:id', attendeeController.getAttendeeByUploadId )

// Route to update an Attendee by ID
router.put( '/:id', attendeeController.updateAttendee )

// Route to delete an Attendee by ID
router.delete( '/:id', attendeeController.deleteAttendee )

export default router