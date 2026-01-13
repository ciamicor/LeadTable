import express from 'express';

const router = express.Router();
import * as scanController from '../controllers/scan.controller.js'

// Route to get all scans
router.get( '/', scanController.getAllScans );

// Create scan
router.post( '/', scanController.createScan );

export default router;