const { uploadAttendee } = require( '../models' )
const { Op } = require( "sequelize" );
// Controller method to create a new attendee
exports.createUpload = async ( req, res ) => {
    const {
        expo_Year,
        expo_Client,

    } = req.body
    try {
        const newUpload = await uploadAttendee.create( {
            expo_Year,
            expo_Client,
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
exports.getAllAttendeeUploads_Client = async ( req, res ) => {
    const client = req.params.client
    try {
        const uploads = await uploadAttendee.findAll(
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
exports.getAttendeeUpload = async ( req, res ) => {
    const id = req.params.id
    try {
        const upload = await uploadAttendee.findByPk( id )
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
