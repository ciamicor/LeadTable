const { Lead } = require( '../models' )
const { Op } = require( 'sequelize' )

// Controller method to create a new lead
exports.createLead = async ( req, res ) => {
    const {
        expo_Client,
        expo_Year,
        attendee_Id,
        scan_Company_Id,
        name_First,
        name_Last,
        email,
        phone,
        employer,
        address_Line1,
        address_Line2,
        address_City,
        address_State,
        address_Zip,
        address_Country,
        title,
        score,
        comment
    } = req.body
    console.log( 'Creating Lead: ', req.body )
    try {
        const newLead = await Lead.create( {
            expo_Client,
            expo_Year,
            attendee_Id,
            scan_Company_Id,
            name_First,
            name_Last,
            email,
            phone,
            employer,
            address_Line1,
            address_Line2,
            address_City,
            address_State,
            address_Zip,
            address_Country,
            title,
            score,
            comment
        } )
        res.status( 201 ).json( newLead )
    } catch ( error ) {
        console.error( 'Error while creating lead: ', error )

        if ( error.name === 'SequelizeForeignKeyConstraintError' ) {
            return res.status( 400 ).json( {
                error: 'Invalid foreign key',
                message: 'Referenced attendee or company does not exist'
            } )
        }

        res.status( 500 ).json( {
            error: 'Something went wrong on the server.',
            details: error?.message || 'Unknown error',
            stack: error.stack
        } )
    }
}

// Get all leads
exports.getAllLeads = async ( req, res ) => {
    try {
        const leads = await Lead.findAll( {} )
        if ( leads ) {
            res.json( leads )
        } else {
            res.status( 404 ).json( { error: 'No leads found.' } )
        }
    } catch ( error ) {
        console.error( 'error in controller: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get all leads by exhibitor
exports.getAllExhibitorLeads = async ( req, res ) => {
    const company_Id = req.params.id
    try {
        const leads = await Lead.findAll( {
            where: {
                [Op.and]: [ { scan_Company_Id: company_Id } ]
            }
        } )
        if ( leads ) {
            res.json( leads )
        } else {
            res.status( 404 ).json( { error: 'No leads found for this company.' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAllExhibitorLeads: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with getAllExhibitorLeads.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get a lead by ID
exports.getLeadById = async ( req, res ) => {
    const id = req.params.id
    try {
        const lead = await Lead.findByPk( id )
        if ( lead ) {
            res.json( lead )
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to update a lead by ID
exports.updateLead = async ( req, res ) => {
    const id = req.params.id

    const {
        name_First,
        name_Last,
        email,
        phone,
        employer,
        address_Line1,
        address_Line2,
        address_City,
        address_State,
        address_Zip,
        address_Country,
        title,
        score,
        comment
    } = req.body
    try {
        const lead = await Lead.findByPk( id )
        if ( lead ) {
            lead.name_First = name_First
            lead.name_Last = name_Last
            lead.email = email
            lead.phone = phone
            lead.employer = employer
            lead.address_Line1 = address_Line1
            lead.address_Line2 = address_Line2
            lead.address_City = address_City
            lead.address_State = address_State
            lead.address_Zip = address_Zip
            lead.address_Country = address_Country
            lead.title = title
            lead.score = score
            lead.comment = comment
            await lead.save()
            res.json( lead )
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to delete a lead by ID
exports.deleteLead = async ( req, res ) => {
    const id = req.params.id
    try {
        const lead = await Lead.findByPk( id )
        if ( lead ) {
            await lead.destroy()
            res.json( lead )
        } else {
            res.status( 404 ).json( { error: 'Lead not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong.',
            details: error?.message || 'Unknown error'
        } )
    }
}
