const { Attendee, Expo } = require( '../models' )
const { Op } = require( "sequelize" );

// Controller method to get all attendees
exports.getAllAttendees = async ( req, res ) => {
    try {
        const attendees = await Attendee.findAll()
        res.json( attendees )
    } catch ( error ) {
        console.error( 'error in controller getAllAttendees: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: getAllAttendees.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to create a new attendee
exports.createAttendee = async ( req, res ) => {
    const {
        expo_Year,
        expo_Client,
        name_First,
        name_Last,
        contact_Email,
        contact_Phone,
        contact_Employer,
        address,
        title,
        reg_Type,
        tech_Sem
    } = req.body
    try {
        const newAttendee = await Attendee.create( {
            expo_Year,
            expo_Client,
            name_First,
            name_Last,
            contact_Email,
            contact_Phone,
            contact_Employer,
            address,
            title,
            reg_Type,
            tech_Sem
        } )
        res.status( 201 ).json( newAttendee )
    } catch ( error ) {
        console.error( 'Error while creating lead: ', error )

        if ( error.name === 'SequelizeUniqueConstraintError' ) {
            return res.status( 400 ).json( {
                error: 'Cannot create attendee',
                message: 'Attendee with email ' + contact_Email + ' already exists.'

            } )
        }

        res.status( 500 ).json( {
            error: 'Something went wrong on the server.',
            details: error?.message || 'Unknown error',
            stack: error.stack
        } )
    }
}

// Get Attendees by Expo
exports.getExpoAttendees = async ( req, res ) => {
    const client = req.params.client
    const year = req.params.year

    try {
        const expo = await Attendee.findAll(
            {
                where: {
                    [Op.and]: [ { expo_Client: client }, { expo_Year: year } ]
                }
            }
        )
        if ( expo ) {
            res.json( expo )
        } else {
            res.status( 404 ).json( { error: 'Expo or year not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getExpoAttendees: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting those attendees.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to get an attendee by ID
exports.getAttendeeById = async ( req, res ) => {
    const id = req.params.id
    try {
        const attendee = await Attendee.findByPk( id )
        if ( attendee ) {
            res.json( attendee )
        } else {
            res.status( 404 ).json( { error: 'Attendee not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAttendeeById: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: getAttendeeById.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to update an attendee by ID
exports.updateAttendee = async ( req, res ) => {
    const id = req.params.id
    const { name_First, name_Last, contact_Email, contact_Phone, contact_Employer } = req.body
    try {
        const attendee = await Attendee.findByPk( id )
        if ( attendee ) {
            attendee.name_First = name_First
            attendee.name_Last = name_Last
            attendee.contact_Email = contact_Email
            attendee.contact_Phone = contact_Phone
            attendee.contact_Employer = contact_Employer
            await attendee.save()
            res.json( attendee )
        } else {
            res.status( 404 ).json( { error: 'Attendee not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller updateAttendee: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: updateAttendee.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to delete a attendee by ID
exports.deleteAttendee = async ( req, res ) => {
    const id = req.params.id
    try {
        const attendee = await Attendee.findByPk( id )
        if ( attendee ) {
            await attendee.destroy()
            res.json( attendee )
        } else {
            res.status( 404 ).json( { error: 'Attendee not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller deleteAttendee: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: deleteAttendee.',
            details: error?.message || 'Unknown error'
        } )
    }
}
