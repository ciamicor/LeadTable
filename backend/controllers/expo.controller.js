const { Expo } = require( '../models' )

// Controller method to create a new expo
exports.createExpo = async ( req, res ) => {
    const {
        id,
        active,
        start_Date,
        expo_Client,
        year,
        expoFp_Id,
        logoUrl_Color,
        logoUrl_Black,
        expoFp_MapUrl
    } = req.body
    try {
        const newExpo = await Expo.create( {
            id,
            active,
            start_Date,
            expo_Client,
            year,
            expoFp_Id,
            logoUrl_Color,
            logoUrl_Black,
            expoFp_MapUrl
        } )
        res.status( 201 ).json( newExpo )
    } catch ( error ) {
        console.error( 'error in controller createExpo: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while creating a expo.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to get all Expos
exports.getAll = async ( req, res ) => {
    try {
        const expos = await Expo.findAll()
        console.log( expos )
        res.json( expos )
    } catch ( error ) {
        console.error( 'error in controller getAllExpos: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting all expos.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Controller method to get a expo by ID
exports.getExpoById = async ( req, res ) => {
    const id = req.params.id
    try {
        const expo = await Expo.findByPk( id )
        if ( expo ) {
            res.json( expo )
        } else {
            res.status( 404 ).json( { error: 'Expo not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getExpoById: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting that expo.',
            details: error?.message || 'Unknown error'
        } )
    }
}
