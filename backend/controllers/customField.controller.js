import { CustomField } from "../models/index.js"
import { Op } from 'sequelize';

// Get Custom Fields by Event
export const getCustomFields = async ( req, res ) => {
    const eId = req.params.eventId
    console.log( eId )
    try {
        const customFields = await CustomField.findAll(
            {
                where: {
                    eventId: eId
                },
                order: [ 'displayOrder' ]
            },
        )
        if ( customFields ) {
            res.json( customFields )
        } else {
            res.status( 404 )
                .json( { error: `I didnt find any custom fields for the event with id ${ eId }.` } )
        }
    } catch ( error ) {
        console.error( 'error in controller getCustomFields: ', error )
        res.status( 500 ).json( {
            error: `Something went wrong while getting custom fields with id ${ eId }.`,
            details: error?.message || 'Unknown error'
        } )
    }
}
