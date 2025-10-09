import express from "express";

const router = express.Router();
import * as companyController from "../controllers/company.controller.js";

// Route to create a new company
router.post( '/', companyController.createCompany );

// Route to get all companies
router.get( '/', companyController.getAllCompanies );

// Route to get a company by ID
router.get( '/:id', companyController.getCompanyById );

// Route to update a Company by ID
router.put( '/:id', companyController.updateCompany )

export default router