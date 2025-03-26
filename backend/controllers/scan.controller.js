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

// Controller method to create a new company
exports.createScan = async ( req, res ) => {
    const { expo_Id, company_Id, lead_Id, lead_Score, company_Comments } = req.body;
    try {
        const newCompany = await Scan.create( {
            expo_Id,
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