// require( '@dotenvx/dotenvx' ).config()

import '@dotenvx/dotenvx/config';

import Sequelize from "./config/config.js";
import express from "express";
import path from "path";
// let path = require( 'path' )
import cors from 'cors';

/*-| Better Auth |-*/
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.ts";

// Init Routes
import leadRoutes from "./routes/lead.routes.js"
import attendeeRoutes from "./routes/attendee.routes.js"
import companyRoutes from "./routes/company.routes.js"
import uploadRoutes from "./routes/uploadAttendee.routes.js"
import expoRoutes from "./routes/expo.routes.js"
import techSessionRoutes from "./routes/techSession.routes.js"

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Init DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// Connect to the database

Sequelize.authenticate()
    .then( () => console.log( `Database ${ process.env.DB_NAME } connected` ) )
    .catch( ( err ) => console.error( 'Error connecting to database:', err ) )
Sequelize.sync( {} )
    .then( async () => {
    } )

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| Init App
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/
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

// Better Auth handler
app.all( '/api/auth/*', toNodeHandler( auth ) );

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
app.use( '/api/techsession', techSessionRoutes )

// Adjust _dirname for ES6 modules
const __dirname = import.meta.dirname;

app.use( express.static( path.join( __dirname, frontend_root ) ) )
app.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, frontend_root, 'index.html' ) )
} )

/*-| Handle Errors |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
app.use( ( req, res, next ) => {
    const error = new Error( `🔍 Not Found - ${ req.originalUrl }` )
    error.status = 404
    next( error )
} )
app.use( ( err,
           req,
           res,
           next ) => {
    console.error( '🔥 Uncaught Error:', {
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        body: req.body
    } )

    res.status( err.status || 500 ).json( {
        error: '🔥 Uh oh. Internal Server Error',
        message: err.message
    } )
} )

app.listen( PORT, () => {
    console.log( `Server ${ HOST } is sorting your data on port ${ PORT }` )
    console.log( `Better Auth is looking at your password at port ${ PORT }` );
} )

export default app