const { Scan, Lead } = require( "../models" )

// Get all scans
exports.getAllScans = async ( req, res ) => {
    try {
        const scans = await Scan.findAll();
        res.json( scans );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to get a company by ID
exports.getScan = async ( req, res ) => {
    const id = req.params.id;
    try {
        const scan = await Scan.findByPk( id );
        if ( scan ) {
            res.json( scan );
        } else {
            res.status( 404 ).json( { error: 'Company not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to create a new Scan
exports.createScan = async ( req, res ) => {
    const { expo_Year, company_Id, lead_Id, lead_Score, company_Comments } = req.body;
    try {
        const newCompany = await Scan.create( {
            expo_Year,
            company_Id,
            lead_Id,
            lead_Score,
            company_Comments
        } );
        res.status( 201 ).json( newCompany );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};