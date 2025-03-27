const { Company } = require( "../models" )

// Controller method to get all Companies
exports.getAllCompanies = async ( req, res ) => {
    try {
        const companies = await Company.findAll();
        res.json( companies );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to create a new company
exports.createCompany = async ( req, res ) => {
    const { expo_Year, company_Name, company_Email, company_Web, company_Phone } = req.body;
    try {
        const newCompany = await Company.create( {
            expo_Year,
            company_Name,
            company_Email,
            company_Web,
            company_Phone
        } );
        res.status( 201 ).json( newCompany );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to get a company by ID
exports.getCompanyById = async ( req, res ) => {
    const id = req.params.id;
    try {
        const company = await Company.findByPk( id );
        if ( company ) {
            res.json( company );
        } else {
            res.status( 404 ).json( { error: 'Company not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to update a company by ID
exports.updateCompany = async ( req, res ) => {
    const id = req.params.id;
    const { company_Name, company_Email, company_Web, company_Phone } = req.body;
    try {
        const company = await Company.findByPk( id );
        if ( company ) {
            company.company_Name = company_Name
            company.company_Email = company_Email
            company.company_Web = company_Web
            company.company_Phone = company_Phone
            await company.save();
            res.json( company );
        } else {
            res.status( 404 ).json( { error: 'Company not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to delete a company by ID
exports.deleteCompany = async ( req, res ) => {
    const id = req.params.id;
    try {
        const company = await Company.findByPk( id );
        if ( company ) {
            await company.destroy();
            res.json( company );
        } else {
            res.status( 404 ).json( { error: 'Company not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};
