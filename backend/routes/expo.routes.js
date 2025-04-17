const express = require( 'express' )
const router = express.Router()
const expoController = require( '../controllers/expo.controller' )

// Route to create a new Expo
router.post( '/', expoController.createExpo )

// Route to get all Expos
router.get( '/', expoController.getAll )

// Route to get a expo by ID
router.get( '/:id', expoController.getExpoById )

module.exports = router