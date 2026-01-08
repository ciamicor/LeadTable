const express = require( 'express' )
const router = express.Router()
const customField = require( '../controllers/customField.controller' )

// Route to get custom fields by event id
router.get( '/event/:eventId', customField.getCustomFields )

module.exports = router