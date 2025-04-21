const express = require( 'express' )
const router = express.Router()
const expoController = require( '../controllers/expo.controller' )

// Route to create a new Expo
router.post( '/', expoController.createExpo )

// Route to get all Expos
router.get( '/', expoController.getAll )

// Route to get expo by year, client
router.get( '/client/:client/year/:year', expoController.getExpo )

module.exports = router