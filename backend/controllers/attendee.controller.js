import { Attendee, Expo } from "../models/index.js"
import { Op } from 'sequelize';

// Controller method to get all attendees
export const getAllAttendees = async ( req, res ) => {
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
export const createAttendee = async ( req, res ) => {
    const {
        expo_Year,
        expo_Client,
        name_First,
        name_Last,
        contact_Email,
        contact_Phone,
        contact_Employer,
        title,
        address_Line1,
        address_Line2,
        address_City,
        address_State,
        address_Zip,
        address_Country,
        reg_Type,
        tech_Sem,
        upload_Id
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
            title,
            address_Line1,
            address_Line2,
            address_City,
            address_State,
            address_Zip,
            address_Country,
            reg_Type,
            tech_Sem,
            upload_Id
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
// Controller method to create batch of attendees
// https://sequelize.org/docs/v7/querying/insert/
// TODO Add bulk attendee creation & related routes/services
exports.createAttendeeBulk = async ( req, res ) => {
    const {
        expo_Year,
        expo_Client,
        name_First,
        name_Last,
        contact_Email,
        contact_Phone,
        contact_Employer,
        title,
        address_Line1,
        address_Line2,
        address_City,
        address_State,
        address_Zip,
        address_Country,
        reg_Type,
        tech_Sem,
        upload_Id
    } = req.body
    try {
        const bulkAttendees = await Attendee.bulkCreate( {
            expo_Year,
            expo_Client,
            name_First,
            name_Last,
            contact_Email,
            contact_Phone,
            contact_Employer,
            title,
            address_Line1,
            address_Line2,
            address_City,
            address_State,
            address_Zip,
            address_Country,
            reg_Type,
            tech_Sem,
            upload_Id
        } )
        res.status( 201 ).json( bulkAttendees )
    } catch ( error ) {
        console.error( 'Error while creating lead: ', error )
        if ( error.name === 'SequelizeUniqueConstraintError' ) {
            return res.status( 400 ).json( {
                error: 'Cannot create attendees',
                message: "Sorry, I didn't like that data. I'm not sure why."
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
export const getExpoAttendees = async ( req, res ) => {
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

// Get attendees created between two dates
export const getAttendeesBetweenDates = async ( req, res ) => {
    const startDate = req.params.startDate
    const endDate = req.params.endDate
    try {
        const attendees = await Attendee.findAll(
            {
                where: {
                    createdAt: { [Op.between]: [ startDate, endDate ] }
                }
            }
        )
        if ( attendees ) {
            res.json( attendees )
        } else {
            res.status( 404 ).json( { error: 'No attendees created between those dates.' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAttendeesBetweenDates: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting those attendees.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get an attendee by ID
export const getAttendeeById = async ( req, res ) => {
    const id = req.params.id
    try {
        const attendee = await Attendee.findByPk( id )
        if ( attendee ) {
            res.json( attendee )
        } else {
            res.status( 404 ).json( { error: 'Attendee ID not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAttendeeById: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: getAttendeeById.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get an attendee by UPLOAD ID
export const getAttendeeByUploadId = async ( req, res ) => {
    const id = req.params.id
    try {
        const attendee = await Attendee.findAll(
            {
                where: {
                    [Op.and]: [ { upload_Id: id } ]
                }
            }
        )
        if ( attendee ) {
            res.json( attendee )
        } else {
            res.status( 404 ).json( { error: 'Attendee not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAttendeeByUploadId: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: getAttendeeById.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to update an attendee by ID
export const updateAttendee = async ( req, res ) => {
    const id = req.params.id
    const {
        name_First,
        name_Last,
        title,
        contact_Email,
        contact_Phone,
        contact_Employer,
        address_Line1,
        address_Line2,
        address_City,
        address_State,
        address_Zip,
        address_Country,
        reg_Type,
        tech_Sem
    } = req.body
    try {
        const attendee = await Attendee.findByPk( id )
        if ( attendee ) {
            attendee.name_First = name_First
            attendee.name_Last = name_Last
            attendee.title = title
            attendee.contact_Email = contact_Email
            attendee.contact_Phone = contact_Phone
            attendee.contact_Employer = contact_Employer
            attendee.address_Line1 = address_Line1
            attendee.address_Line2 = address_Line2
            attendee.address_City = address_City
            attendee.address_State = address_State
            attendee.address_Zip = address_Zip
            attendee.address_Country = address_Country
            attendee.reg_Type = reg_Type
            attendee.tech_Sem = tech_Sem
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
export const deleteAttendee = async ( req, res ) => {
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
