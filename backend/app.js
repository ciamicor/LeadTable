import '@dotenvx/dotenvx/config';
import nodemailer from 'nodemailer'
import Sequelize from "./config/config.js";
import express from "express";
import path from "path";
import cors from 'cors';

// Init Routes
import leadRoutes from "./routes/lead.routes.js"
import attendeeRoutes from "./routes/attendee.routes.js"
import companyRoutes from "./routes/company.routes.js"
import uploadRoutes from "./routes/uploadAttendee.routes.js"
import expoRoutes from "./routes/expo.routes.js"
import customFieldRoutes from "./routes/customField.routes.js"

async function sendEmail() {
    console.log( 'Sending email...' )
    let transporter = nodemailer.createTransport( {
        host: 'mail.leadtable.app',
        port: 587, // 465
        secure: false,
        auth: {
            user: 'registration@leadtable.app',
            pass: 'SEEK7effects.topped0axl'
        }
    } )

    let info = await transporter.sendMail( {
        "from": "\"Claire Mooney\" <registration@leadtable.app>",
        "to": "claire@iami411.org",
        "cc": "dev@leadtable.app",
        "subject": "Hello from Nodemailer!",
        "html": "<h1>Hello!</h1>\n<p>This is an <strong>HTML</strong> message with an embedded image:</p>\n<p><img src=\"cid:logo@example\" alt=\"Logo\" style=\"width: 16px; height: 16px;\"></p>\n<p>Edit the JSON on the left to see the preview update in real-time.</p>",
        "attachments": [
            {
                "filename": "logo.png",
                "content": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUUlEQVR42sWTwQ4AMARD6f//s103MdOQzNUrtXQizdJbw0TMgVoa4IWB4NCAEUcMGHHEovuIYLd7FzMO/g/QJFCvPMydwLjYWVTynjHtz9SuBVmmEhqhGKQyAAAAAElFTkSuQmCC",
                "encoding": "base64",
                "cid": "logo@example",
                "contentType": "image/png"
            },
            {
                "filename": "document.pdf",
                "content": "JVBERi0xLjEKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA1OTUgODQyXSAvQ29udGVudHMgNCAwIFIgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgNSAwIFIgPj4gPj4gPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCA1MSA+PgpzdHJlYW0KQlQgL0YxIDEyIFRmIDI2Ni4xNSA0MjEgVGQgKE5vZGVtYWlsZXIpIFRqIEVUCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2EgPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI1MyAwMDAwMCBuIAowMDAwMDAwMzgxIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKNDU0CiUlRU9GCg==",
                "encoding": "base64",
                "contentType": "application/pdf"
            }
        ]
    } )
    console.log( 'Message sent: ' + info.messageId )
}

sendEmail().catch( e => console.log( e ) );

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Init DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
// Connect to the database
Sequelize.authenticate()
    .then( () => console.log( `Database ${ process.env.DB_NAME } connected` ) )
    .catch( ( err ) => console.error( 'Error connecting to database:', err ) )
Sequelize.sync( { /*force: true*/ } )
    .then( async () => {
    } )

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Init App |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const app = express()

// Add CORS
const allowedOrigins = [
    "http://localhost:8080",
    "http://localhost:8081",
    "https://leadtable.iami411.org",
];
app.use( cors( {
    origin: allowedOrigins,
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE" ],
    credentials: true,
} ) )

// Middleware to parse JSON requests
app.use( express.json() )

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'
const frontend_root = 'dist'

app.use( '/api/lead', leadRoutes )
app.use( '/api/company', companyRoutes )
app.use( '/api/attendee', attendeeRoutes )
app.use( '/api/upload', uploadRoutes )
app.use( '/api/expo', expoRoutes )
app.use( '/api/customfield', customFieldRoutes )

// Adjust _dirname for ES6 modules
const __dirname = import.meta.dirname;
app.use( express.static( path.join( __dirname, frontend_root ) ) )
app.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, frontend_root, 'index.html' ) )
} )

/*-| Handle Errors |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
app.use( ( req, res, next ) => {
    const error = new Error( `Not Found - ${ req.originalUrl }` )
    error.status = 404
    next( error )
} )
app.use( ( err, req, res, next ) => {
    console.error( 'Uncaught Error:', {
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        body: req.body
    } )

    res.status( err.status || 500 ).json( {
        error: 'Whoa. Internal Server Error',
        message: err.message
    } )
} )

app.listen( PORT, () => {
    console.log( `Server ${ HOST } is running on port ${ PORT }` )
} )

export default app