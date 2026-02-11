import { UploadAttendee } from "../models/index.js"
import { Op } from 'sequelize';

// Controller method to create a new attendee
export const createUpload = async ( req, res ) => {
    const {
        expo_Year,
        expo_Client,
        upload_Title
    } = req.body
    try {
        const newUpload = await UploadAttendee.create( {
            expo_Year,
            expo_Client,
            upload_Title
        } )
        res.status( 201 ).json( newUpload )
    } catch ( error ) {
        console.error( 'Error while creating lead: ', error )
        if ( error.name === 'SequelizeUniqueConstraintError' ) {
            return res.status( 400 ).json( {
                error: 'Cannot create upload',
                message: 'Error was from sequelize & the DB.'

            } )
        }
        res.status( 500 ).json( {
            error: 'Something went wrong on the server.',
            details: error?.message || 'Unknown error',
            stack: error.stack
        } )
    }
}

// Get All Uploads
export const getAllAttendeeUploads_Client = async ( req, res ) => {
    const client = req.params.client
    try {
        const uploads = await UploadAttendee.findAll(
            {
                where: {
                    [Op.and]: [ { expo_Client: client } ]
                }
            }
        )
        if ( uploads ) {
            res.json( uploads )
        } else {
            res.status( 404 ).json( { error: 'Uploads not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAllAttendeeUploads: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while that upload.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get Upload
export const getAttendeeUpload = async ( req, res ) => {
    const id = req.params.id
    try {
        const upload = await UploadAttendee.findByPk( id )
        if ( upload ) {
            res.json( upload )
        } else {
            res.status( 404 ).json( { error: 'Upload not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getAlluploadAttendees: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while that upload.',
            details: error?.message || 'Unknown error'
        } )
    }
}
