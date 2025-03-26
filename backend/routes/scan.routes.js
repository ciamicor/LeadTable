const express = require( 'express' );
const router = express.Router();
const scanController = require( '../controllers/scan.controller' );

// Route to get all scans
router.get( '/', scanController.getAllScans );

// Create scan
router.post( '/', scanController.createScan );

module.exports = router;