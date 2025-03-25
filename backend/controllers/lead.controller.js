const Lead = require( '../models/lead' );

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
    const { lead_FName, lead_LName, lead_Rating } = req.body;
    try {
        const newLead = await Lead.create( {
            lead_FName,
            lead_LName,
            lead_Rating
        } );
        res.status( 201 ).json( newLead );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Internal Server Error' + error.message } );
    }
};

// Controller method to get a lead by Rating
exports.getLeadByRating = async ( req, res ) => {
    const leadRating = req.params.rating;
    try {
        const lead = await Lead
            .findAll( {
                where: {
                    lead_Rating: leadRating
                }
            } )
        if ( lead ) {
            res.json( lead );
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } );
        }
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
    const { lead_FName, lead_LName, lead_Rating } = req.body;
    try {
        const lead = await Lead.findByPk( id );
        if ( lead ) {
            lead.lead_FName = lead_FName;
            lead.lead_LName = lead_LName;
            lead.lead_Rating = lead_Rating;
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
