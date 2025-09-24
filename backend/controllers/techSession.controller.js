const { TechSession, Expo } = require( '../models' )
const { Op } = require( "sequelize" );

// Controller method to get all Tech Sessions
exports.getAllTechSessions = async ( req, res ) => {
    try {
        const techSessions = await TechSession.findAll()
        res.json( techSessions )
    } catch ( error ) {
        console.error( 'error in controller getAllTechSessions: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: getAllTechSessions.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to create a new Tech Session
exports.createTechSession = async ( req, res ) => {
    const {
        expo_Year,
        expo_Client,
        title,
        subtitle,
        time_Start,
        time_End,
        location,
        track,
        about,
        objectives
    } = req.body
    try {
        const newTechSession = await TechSession.create( {
            expo_Year,
            expo_Client,
            title,
            subtitle,
            time_Start,
            time_End,
            location,
            track,
            about,
            objectives
        } )
        res.status( 201 ).json( newTechSession )
    } catch ( error ) {
        console.error( 'Error while creating Tech Session: ', error )
        if ( error.name === 'SequelizeUniqueConstraintError' ) {
            return res.status( 400 ).json( {
                error: 'Cannot create Tech Session',
                message: 'Tech Session with title ' + title + ' already exists.'

            } )
        }
        res.status( 500 ).json( {
            error: 'Something went wrong on the server.',
            details: error?.message || 'Unknown error',
            stack: error.stack
        } )
    }
}

// Get Tech Sessions by Expo
exports.getExpoTechSessions = async ( req, res ) => {
    const client = req.params.client
    const year = req.params.year
    try {
        const techSessions = await TechSession.findAll(
            {
                where: {
                    [Op.and]: [ { expo_Client: client }, { expo_Year: year } ]
                }
            }
        )
        if ( techSessions ) {
            res.json( techSessions )
        } else {
            res.status( 404 ).json( { error: 'Expo or year not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getExpoTechSessions: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting those Tech Sessions.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to get a Tech Session by ID
exports.getTechSessionById = async ( req, res ) => {
    const id = req.params.id
    try {
        const techSession = await TechSession.findByPk( id )
        if ( techSession ) {
            res.json( techSession )
        } else {
            res.status( 404 ).json( { error: 'Tech Sessions not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getTechSessionById: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: getSessionsById.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to update an attendee by ID
exports.updateTechSession = async ( req, res ) => {
    const id = req.params.id
    const {
        expo_Year,
        expo_Client,
        title,
        subtitle,
        time_Start,
        time_End,
        location,
        track,
        about,
        objectives
    } = req.body
    try {
        const techSession = await TechSession.findByPk( id )
        if ( techSession ) {
            techSession.expo_Year = expo_Year
            techSession.expo_Client = expo_Client
            techSession.title = title
            techSession.subtitle = subtitle
            techSession.time_Start = time_Start
            techSession.time_End = time_End
            techSession.location = location
            techSession.track = track
            techSession.about = about
            techSession.objectives = objectives
            await techSession.save()
            res.json( techSession )
        } else {
            res.status( 404 ).json( { error: 'Tech Session not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller updateTechSession: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: updateTechSession.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to delete a Tech Session by ID
exports.deleteTechSession = async ( req, res ) => {
    const id = req.params.id
    try {
        const techSession = await TechSession.findByPk( id )
        if ( techSession ) {
            await techSession.destroy()
            res.json( techSession )
        } else {
            res.status( 404 ).json( { error: 'Tech Session not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller deleteTechSession: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong with controller: deleteTechSession.',
            details: error?.message || 'Unknown error'
        } )
    }
}
