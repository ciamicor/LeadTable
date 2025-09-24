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
// const Sequelize = require( './config/config' )

import {
    Scan,
    Lead,
    Company,
    Expo,
    Attendee,
    UploadAttendee,
    TechSession
} from "./models/index.js";

// Connect to the database

Sequelize.authenticate()
    .then( () => console.log( `Database ${ process.env.DB_NAME } connected` ) )
    .catch( ( err ) => console.error( 'Error connecting to database:', err ) )
Sequelize.sync( { /*force: true*/ } )
    .then( async () => {
        /*await initPlaceholdData()*/
    } )

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| Init App
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/
const app = express()

// Add CORS
app.use( cors() )

app.all( "/api/auth/{*any}", toNodeHandler( auth ) );

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
app.use( ( err, req, res, next ) => {
    console.error( '🔥 Uncaught Error:', {
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        body: req.body
    } )

    res.status( err.status || 500 ).json( {
        error: '🔥 Internal Server Error',
        message: err.message
    } )
} )

app.listen( PORT, () => {
    console.log( `Server ${ HOST } is running on port ${ PORT }` )
} )

export default app