import { Company } from "../models/index.js"
import { Op } from 'sequelize';

// Controller method to create a new company
export const createExhibitor = async ( req, res ) => {
    const {
        id,
        expoId,
        expo_Client,
        expo_Year,
        login_Url,
        name,
        lead_Ret
    } = req.body
    try {
        const newCompany = await Company.create( {
            id,
            expoId,
            expo_Client,
            expo_Year,
            login_Url,
            name,
            lead_Ret
        } )
        res.status( 201 ).json( newCompany )
    } catch ( error ) {
        console.error( 'error in controller createCompany: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while creating a company.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get all Companies
export const getAllExhibitors = async ( req, res ) => {
    try {
        const companies = await Company.findAll()
        res.json( companies )
    } catch ( error ) {
        console.error( 'error in controller getAllCompanies: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting all companies.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get a company by ID
export const getExhibitorById = async ( req, res ) => {
    const id = req.params.id
    try {
        const company = await Company.findByPk( id )
        if ( company ) {
            res.json( company )
        } else {
            res.status( 404 ).json( { error: 'Exhibitor not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getExhibitorById: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting an exhibitor.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Update Lead Retrieval Status
export const updateExhibitor = async ( req, res ) => {
    const id = req.params.id
    const { lead_Ret } = req.body
    try {
        const company = await Company.findByPk( id )
        if ( company ) {
            company.lead_Ret = lead_Ret
            await company.save()
            res.json( company )
        } else {
            res.status( 404 ).json( { error: 'Exhibitor not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller updateExhibitor: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: updateExhibitor.',
            details: error?.message || 'Unknown error'
        } )
    }
}