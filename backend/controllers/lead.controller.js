const { Lead } = require( "../models" )

// Controller method to get all leads
exports.getAllLeads = async ( req, res ) => {
    try {
        const leads = await Lead.findAll();
        res.json( leads );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to create a new lead
exports.createLead = async ( req, res ) => {
    const { expo_Year, name_First, name_Last, contact_Email, contact_Phone, contact_Employer } = req.body;
    try {
        const newLead = await Lead.create( {
            expo_Year,
            name_First,
            name_Last,
            contact_Email,
            contact_Phone,
            contact_Employer
        } );
        res.status( 201 ).json( newLead );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to get a lead by ID
exports.getLeadById = async ( req, res ) => {
    const id = req.params.id;
    try {
        const lead = await Lead.findByPk( id );
        if ( lead ) {
            res.json( lead );
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to update a lead by ID
exports.updateLead = async ( req, res ) => {
    const id = req.params.id;
    const { name_First, name_Last, contact_Email, contact_Phone, contact_Employer } = req.body;
    try {
        const lead = await Lead.findByPk( id );
        if ( lead ) {
            lead.name_First = name_First
            lead.name_Last = name_Last
            lead.contact_Email = contact_Email
            lead.contact_Phone = contact_Phone
            lead.contact_Employer = contact_Employer
            await lead.save();
            res.json( lead );
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to delete a lead by ID
exports.deleteLead = async ( req, res ) => {
    const id = req.params.id;
    try {
        const lead = await Lead.findByPk( id );
        if ( lead ) {
            await lead.destroy();
            res.json( lead );
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};
