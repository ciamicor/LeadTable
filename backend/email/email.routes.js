import express from 'express';

const router = express.Router()
import * as mailController from './email.controller.js'

// Send email message
router.post( '/', mailController.sendEmail )

export default router