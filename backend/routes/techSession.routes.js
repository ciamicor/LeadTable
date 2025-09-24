import express from "express";

const router = express.Router()
import * as techSessionController from "../controllers/techSession.controller.js";

// Route to create a new tech session
router.post( '/', techSessionController.createTechSession )

// Route to get all tech sessions
router.get( '/', techSessionController.getAllTechSessions )

// Get tech sessions by Expo
router.get( '/client/:client/year/:year', techSessionController.getExpoTechSessions )

// Route to get a tech session by ID
router.get( '/:id', techSessionController.getTechSessionById )

// Route to update a tech session by ID
router.put( '/:id', techSessionController.updateTechSession )

// Route to delete a tech session by ID
router.delete( '/:id', techSessionController.deleteTechSession )

export default router