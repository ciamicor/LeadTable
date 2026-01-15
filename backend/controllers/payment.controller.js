import { Payment } from "../models/index.js"
import { Op } from 'sequelize';

// Log new payment
export const createPayment = async ( req, res ) => {
    const {
        nameFirst,
        nameLast,
        attendeeId,
        payerEmail,
        eventId,
        eventClient,
        eventYear,
        productId,
        processorId,
        paymentSuccess,
        details,
        isSandbox
    } = req.body
    try {
        const newPayment = await Payment.create( {
            nameFirst,
            nameLast,
            attendeeId,
            payerEmail,
            eventId,
            eventClient,
            eventYear,
            productId,
            processorId,
            paymentSuccess,
            details,
            isSandbox
        } )
        res.status( 201 ).json( newPayment )
    } catch ( error ) {
        console.error( 'Error while creating payment: ', error )
        if ( error.name === 'SequelizeUniqueConstraintError' ) {
            return res.status( 400 ).json( {
                error: 'Cannot create payment',
                message: error

            } )
        }
        res.status( 500 ).json( {
            error: 'Something went wrong on the server.',
            details: error?.message || 'Unknown error',
            stack: error.stack
        } )
    }
}
