const { Expo } = require( '../models' )
const { Op } = require( 'sequelize' );

// Controller method to create a new expo
exports.createExpo = async ( req, res ) => {
    const {
        id,
        active,
        start_Date,
        expo_Client,
        expo_Year,
        expoFp_Id,
        expoFp_MapUrl,
        expoFp_Token,
        logoUrl_Color,
        logoUrl_Black,
    } = req.body
    try {
        const newExpo = await Expo.create( {
            id,
            active,
            start_Date,
            expo_Client,
            expo_Year,
            expoFp_Id,
            expoFp_MapUrl,
            expoFp_Token,
            logoUrl_Color,
            logoUrl_Black,
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

// Get Expo by Client, Year
exports.getExpo = async ( req, res ) => {
    const client = req.params.client
    const year = req.params.year

    try {
        const expo = await Expo.findOne(
            {
                where: {
                    [Op.and]: [ { expo_Client: client }, { expo_Year: year } ]
                }
            }
        )
        if ( expo ) {
            res.json( expo )
        } else {
            res.status( 404 ).json( { error: 'Expo not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getExpo: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting that expo.',
            details: error?.message || 'Unknown error'
        } )
    }
}

// Get Expo by Client, Year
/*exports.getExpoToken = async ( req, res ) => {
    const client = req.params.client
    const year = req.params.year

    try {
        const expo = await Expo.findOne(
            {
                where: {
                    [Op.and]: [ { expo_Client: client }, { expo_Year: year } ]
                }
            }
        )
        if ( expo ) {
            return res.json( expo.expoFp_Token )
        } else {
            res.status( 404 ).json( { error: 'Expo not found' } )
        }
    } catch ( error ) {
        console.error( 'error in controller getExpoToken: ', error )
        res.status( 500 ).json( {
            error: 'Something went wrong while getting that expo\'s token.',
            details: error?.message || 'Unknown error'
        } )
    }
}*/
