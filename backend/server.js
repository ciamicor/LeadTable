require( '@dotenvx/dotenvx' ).config()

const Sequelize = require( "./config/config" );
const {
    Scan,
    Lead,
    Company,
    Expo
} = require( "./models" );

// Connect to the database
Sequelize.authenticate()
    .then( () => console.log( 'Database connected' ) )
    .catch( ( err ) => console.error( 'Error connecting to database:', err ) );

Sequelize.sync( { force: true } ).then( async () => {

    await initPlaceholdData()

} )
//
//
//
const express = require( 'express' );
const app = express();

const leadRoutes = require( './routes/lead.routes' );
const companyRoutes = require( './routes/company.routes' );
const scanRoutes = require( './routes/scan.routes' );

// Add CORS
const cors = require( 'cors' )
app.use( cors() )

// Middleware to parse JSON requests
app.use( express.json() );

// Routes
app.use( '/lead', leadRoutes );
app.use( '/company', companyRoutes );
app.use( '/scan', scanRoutes );

const PORT = process.env.PORT || 8080;

app.listen( PORT, () => {
    console.log( `Server is running on port ${ PORT }` );
} );
//
//
//
//
//
//
//
//
//
//
//
//
async function initPlaceholdData() {
    const newExpo = await Expo.create( {
        expo_Active: 1,
        expo_Year: 2025,
    } )

    const newCompany = await Company.create( {
        expo_Id: 1,
        company_Name: "IAMI",
        company_Email: "iami@iami411.org",
        company_Web: "https://www.iami411.org",
        company_Phone: "6066066066",
    } )

    const newCompany2 = await Company.create( {
        expo_Id: 1,
        company_Name: "ICOR",
        company_Email: "icor@icor.org",
        company_Web: "https://www.icor.org",
        company_Phone: "654754538",
    } )

    const newCompany3 = await Company.create( {
        expo_Id: 1,
        company_Name: "NYIFT",
        company_Email: "nyift@nyift.org",
        company_Web: "https://www.nyift.org",
        company_Phone: "7777777777",
    } )

    const newLead = await Lead.create( {
        expo_Id: 1,
        name_First: "Claire",
        name_Last: "Mooney",
        contact_Email: "claire@gmail.com",
        contact_Phone: "6066066066",
        contact_Employer: 1
    } )

    const newLead2 = await Lead.create( {
        expo_Id: 1,
        name_First: "Kate",
        name_Last: "Mooney",
        contact_Email: "Kate@aol.com",
        contact_Phone: "323587468",
        contact_Employer: 2
    } )

    const newLead3 = await Lead.create( {
        expo_Id: 1,
        name_First: "Val",
        name_Last: "Mooney",
        contact_Email: "val@yahoo.com",
        contact_Phone: "6068545684",
        contact_Employer: 3
    } )

    const newScan = await Scan.create( {
        expo_Id: 1,
        company_Id: 2,
        lead_Id: 3,
        lead_Score: 2,
        company_Comments: "She's really good at what she does."
    } )

    const newScan2 = await Scan.create( {
        expo_Id: 1,
        company_Id: 2,
        lead_Id: 2,
        lead_Score: 1,
        company_Comments: "I'm in love with her."
    } )

    const newScan3 = await Scan.create( {
        expo_Id: 1,
        company_Id: 3,
        lead_Id: 1,
        lead_Score: 5,
        company_Comments: "She's amazing."
    } )

    console.log( newExpo )
    console.log( newLead )
    console.log( newLead2 )
    console.log( newLead3 )
    console.log( newLead )
    console.log( newLead2 )
    console.log( newLead3 )
    console.log( newScan )
    console.log( newScan2 )
    console.log( newScan3 )
    console.log( newCompany )
    console.log( newCompany2 )
    console.log( newCompany3 )
}