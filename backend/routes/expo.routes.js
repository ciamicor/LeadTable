import express from "express";

const router = express.Router()
import * as expoController from "../controllers/expo.controller.js";

// Route to create a new Expo
router.post( '/', expoController.createExpo )

// Route to get all Expos
router.get( '/', expoController.getAll )

// Route to get expo by year, client
router.get( '/client/:client/year/:year', expoController.getExpo )

// Route to get expo by year, client
// router.get( '/token/client/:client/year/:year', expoController.getExpoToken )

export default router