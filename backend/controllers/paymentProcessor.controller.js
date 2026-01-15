import { PaymentProcessor } from "../models/index.js"

// Get Payment Processor by Event
export const getPaymentProcessor = async ( req, res ) => {
    const eId = req.params.eventId
    console.log( eId )
    try {
        const payProcessor = await PaymentProcessor.findOne(
            {
                where: {
                    eventId: eId
                }
            },
        )
        if ( payProcessor ) {
            res.json( payProcessor )
        } else {
            res.status( 404 )
                .json( { error: `I didnt find a Payment Processor for the event with id ${ eId }.` } )
        }
    } catch ( error ) {
        console.error( 'error in controller getPaymentProcessors: ', error )
        res.status( 500 ).json( {
            error: `Something went wrong while getting Payment Processor with event id ${ eId }.`,
            details: error?.message || 'Unknown error'
        } )
    }
}
