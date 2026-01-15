import express from 'express';

const router = express.Router()
import * as payment from '../controllers/payment.controller.js'

// Route to get product by event id
router.post( '/', payment.createPayment )

export default router