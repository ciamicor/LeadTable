import express from "express";

const router = express.Router();
import * as companyController from "../controllers/company.controller.js";

// Route to create a new company
router.post( '/', companyController.createExhibitor );

// Route to get all companies
router.get( '/', companyController.getAllExhibitors );

// Route to get a company by ID
router.get( '/:id', companyController.getExhibitorById );

// Route to update a exhibitor by ID
router.put( '/:id', companyController.updateExhibitor )

export default router