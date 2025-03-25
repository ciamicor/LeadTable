const express = require( 'express' );
const app = express();
const db = require( './config/db.config' );
const leadRoutes = require( './routes/lead.routes' );

// Connect to the database
db.authenticate()
    .then( () => console.log( 'Database connected' ) )
    .catch( ( err ) => console.error( 'Error connecting to database:', err ) );

// Middleware to parse JSON requests
app.use( express.json() );

// Routes
app.use( '/leads', leadRoutes );
const PORT = process.env.PORT || 8080;
app.listen( PORT, () => {
    console.log( `Server is running on port ${ PORT }` );
} );