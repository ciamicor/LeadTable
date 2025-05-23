const { Company } = require( '../models' )

// Controller method to create a new company
exports.createCompany = async ( req, res ) => {
    const {
        id,
        login_URL,
        name,
        expo_Year,
        expo_Client,
        lead_Ret
    } = req.body
    try {
        const newCompany = await Company.create( {
            id,
            login_URL,
            name,
            expo_Year,
            expo_Client,
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

// Controller method to get all Companies
exports.getAllCompanies = async ( req, res ) => {
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

// Controller method to get a company by ID
exports.getCompanyById = async ( req, res ) => {
    const id = req.params.id
    try {
        const company = await Company.findByPk( id )
        if ( company ) {
            res.json( company )
        } else {
            res.status( 404 ).json( { error: 'Company not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getCompanyById: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting a company.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to update Lead Retrieval Status
exports.updateCompanyLeadRet = async ( req, res ) => {
    const id = req.params.id
    const { lead_Ret } = req.body
    try {
        const company = await Company.findByPk( id )
        if ( company ) {
            company.lead_Ret = lead_Ret
            await company.save()
            res.json( company )
        } else {
            res.status( 404 ).json( { error: 'Company not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller updateCompanyLeadRet: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: updateCompanyLeadRet.',
            details: error?.message || 'Unknown error'
        } )
    }
}