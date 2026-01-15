import express from 'express';

const router = express.Router()
import * as paymentProcessor from '../controllers/paymentProcessor.controller.js'

// Route to get custom fields by event id
router.get( '/event/:eventId', paymentProcessor.getPaymentProcessor )

export default router