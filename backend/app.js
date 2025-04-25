require( '@dotenvx/dotenvx' ).config()

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Init DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const Sequelize = require( './config/config' )
const {
    Lead,
    Company,
    Expo,
    Attendee
} = require( './models' )

// Connect to the database
const { DataTypes } = require( 'sequelize' )
Sequelize.authenticate()
    .then( () => console.log( `Database ${ process.env.DB_NAME } connected` ) )
    .catch( ( err ) => console.error( 'Error connecting to database:', err ) )
Sequelize.sync( { /*force: true*/ } )
    .then( async () => {
        /*await initPlaceholdData()*/
    } )
//
//

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Init App |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const express = require( 'express' )
let path = require( 'path' )
const app = express()

// Add CORS
const cors = require( 'cors' )
app.use( cors() )

// Middleware to parse JSON requests
app.use( express.json() )

// Init Routes
const leadRoutes = require( './routes/lead.routes' )
const attendeeRoutes = require( './routes/attendee.routes' )
const companyRoutes = require( './routes/company.routes' )
const expoRoutes = require( './routes/expo.routes' )

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'
const frontend_root = 'dist'

app.use( '/api/lead', leadRoutes )
app.use( '/api/company', companyRoutes )
app.use( '/api/attendee', attendeeRoutes )
app.use( '/api/expo', expoRoutes )

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

module.exports = app