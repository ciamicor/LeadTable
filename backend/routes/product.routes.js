import express from 'express';

const router = express.Router()
import * as product from '../controllers/product.controller.js'

// Route to get product by event id
router.get( '/event/:eventId', product.getProduct )

export default router