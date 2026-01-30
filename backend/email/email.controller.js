import nodemailer from 'nodemailer'

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| Nodemailer
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/

const transporter = nodemailer.createTransport( {
    host: process.env.REG_EMAIL_HOST,
    port: 465, // 465,
    secure: true, // Use true for port 465, false for port 587
    auth: {
        user: process.env.REG_EMAIL_USER,
        pass: process.env.REG_EMAIL_PASSWORD,
    },
} );
// Send Email
export const sendEmail = async ( req, res ) => {
    const {
        nameFirst,
        nameLast,
        emailTo,
        eventName,
        eventClient,
        eventYear,
    } = req.body
    try {
        // Send an email using async/await
        await (async () => {
            const info = await transporter.sendMail( {
                from: '"Leadtable Registrations" <' + process.env.REG_EMAIL_USER + '>',
                to: "bar@example.com, claire@iami411.org",
                subject: "Hello ✔",
                text: "Hello world?", // Plain-text version of the message
                html: "<b>Hello world?</b>", // HTML version of the message
            } );

            console.log( "Message sent:", info.messageId );
            console.log( info );
        })();
        const newEmail = await Attendee.create( {
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
            regType,
            techSessions,
            customFields,
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