import express from 'express';

const router = express.Router()
import * as customField from '../controllers/customField.controller.js'

// Route to get custom fields by event id
router.get( '/event/:eventId', customField.getCustomFields )

export default router