const express = require( 'express' )
const router = express.Router()
const techSessionController = require( '../controllers/techSession.controller' )

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

module.exports = router