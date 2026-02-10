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
        attendee,
        event
    } = req.body
    try {
        console.log( 'Server email attempt...' )
        // Send an email using async/await
        await (async () => {
        })();
        const info = await transporter.sendMail( {
            from: `"${ event.clientFull }" <${ process.env.REG_EMAIL_USER }>`,
            to: "claire@iami411.org",
            subject: `${ attendee.name_First }, you're going to ${ event.name }!`,
            text: `You've registered for this event, we're excited to see you!`, // Plain-text version of the message
            html: email_RegConfirm( attendee, event ) // HTML version of the message
        } );
        console.log( "Message sent:", info.messageId );
        console.log( info );
        res.status( 201 ).json( info )
    } catch ( error ) {
        console.error( 'Error while sending email: ', error )

        res.status( 500 ).json( {
            error: 'Something went wrong on the server.',
            details: error?.message || 'Unknown error',
            stack: error.stack
        } )
    }
}

function email_RegConfirm(
    a,
    e ) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date = new Date( e.dateStart ).toLocaleDateString( undefined, options )

    return `
    <!DOCTYPE PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title></title>
      </head>
      <body style="background-color: #EEEEEE;">
            <table style="width: 100%; max-width: 550px; background-color: white; margin: 0 auto; padding: 24px; border-radius: 12px; font-size: 16px;">
                <tr>
                    <td colspan="2">
                        <img 
                        style="margin: 0 auto 32px; max-width: 235px;" 
                        src="${ e.logoUrl_Color }" alt="${ e.expo_Client }'s logo in color.">
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-bottom: 32px;">
                        <p>Hi ${ a.name_First },</p>
                        <p>Thanks so much for registering for ${ e.clientFull }'s ${ e.name }. We're looking to seeing you on ${ date }.</p>
                        <p>Your registration information is below. We'll use it to print your badge as well. If you've got questions, or something isn't looking right - get in touch with us at <a href="mailto:${ e.contactEmail }">${ e.contactEmail }</a></p>
                    </td>
                </tr>
              	<tr>
                    <td style="padding: 8px;">Registration Type</td>
                    <td style="padding: 8px;">${ a.regType }</td>
                </tr>

                <tr style="background-color: hsl(0, 0%, 95%);">
                    <td style="padding: 8px;">Name</td>
                    <td style="padding: 8px;">${ a.name_First } ${ a.name_Last }</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">Email</td>
                    <td style="padding: 8px;">${ a.contact_Email }</td>
                </tr>
                <tr style="background-color: hsl(0, 0%, 95%);">
                    <td style="padding: 8px;">Phone</td>
                    <td style="padding: 8px;">${ a.contact_Phone }</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">Company</td>
                    <td style="padding: 8px;">${ a.contact_Employer }</td>
                </tr>
                <tr style="background-color: hsl(0, 0%, 95%);">
                    <td style="padding: 8px;">Title</td>
                    <td style="padding: 8px;">${ a.title }</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">Address</td>
                    <td style="padding: 8px;">
                       ${ a.address_Line1 } ${ a.address_Line2 }<br>
                       ${ a.address_City }, ${ a.address_State } ${ a.address_Zip }<br>
                       ${ a.address_Country }<br>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 16px;">
                        <button style="width:100%; padding: 8px 16px; border: none; font-size: 16px; background-color: hsl(45, 80%, 56%);">
                            <a style="color: black; text-decoration: none" href="${ e.webpage }">View Event Page</a>
                        </button>
                    </td>
                    <td style="padding-top: 16px;">
                        <button style="width:100%; padding: 8px 16px; border: none; font-size: 16px; background-color: hsl(85, 80%, 48%);" >
                            <a style="color: black; text-decoration: none" href="${ e.expoFp_MapUrl }">View the Floor Plan</a>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 32px; font-size: 14px; font-style: italic; text-align: center">
                        <span>This email's inbox is not monitored. To get in touch, use <a href="mailto:${ e.contactEmail }">${ e.contactEmail }</a></span>
                    </td>
                </tr>
            </table>
      </body>
    </html>

        
    `
}