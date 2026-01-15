import { Product } from "../models/index.js"

// Get Product by Event
export const getProduct = async ( req, res ) => {
    const eId = req.params.eventId
    console.log( eId )
    try {
        const product = await Product.findOne(
            {
                where: {
                    eventId: eId
                }
            },
        )
        if ( product ) {
            res.json( product )
        } else {
            res.status( 404 )
                .json( { error: `I didnt find a product for the event with id ${ eId }.` } )
        }
    } catch ( error ) {
        console.error( 'error in controller getProduct: ', error )
        res.status( 500 ).json( {
            error: `Something went wrong while getting product with event id ${ eId }.`,
            details: error?.message || 'Unknown error'
        } )
    }
}
