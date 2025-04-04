require( '@dotenvx/dotenvx' ).config()

const Sequelize = require( "./config/config" );
const {
    Scan,
    Lead,
    Company,
    Expo,
    Attendee
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
const attendeeRoutes = require( './routes/attendee.routes' );
const companyRoutes = require( './routes/company.routes' );
const scanRoutes = require( './routes/scan.routes' );

// Add CORS
const cors = require( 'cors' )
const { DataTypes } = require( "sequelize" );
app.use( cors() )

// Middleware to parse JSON requests
app.use( express.json() );

// Routes
app.use( '/lead', leadRoutes );
app.use( '/company', companyRoutes );
app.use( '/scan', scanRoutes );
app.use( '/attendee', attendeeRoutes );

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
        expoFp_Id: 23706,
        expo_Client: "NYIFT"
    } )
    const newCompany2 = await Company.create( {
        id: 456453,
        expo_Year: 2025,
        login_URL: "https://www.icor.org",
        name: "ICOR",
        email: "icor@icor.org",
        web: "https://www.icor.org",
        phone: "654754538",
    } )

    const newCompany3 = await Company.create( {
        id: 832387,
        expo_Year: 2025,
        login_URL: "https://www.nyift.org",
        name: "NYIFT",
        email: "nyift@nyift.org",
        web: "https://www.nyift.org",
        phone: "7777777777",
    } )

    const newAttendee2 = await Attendee.create( {
        expo_Year: 2025,
        name_First: "Katy",
        name_Last: "Taylor",
        contact_Email: "katy@iami411.org",
        contact_Phone: "323587468",
        contact_Employer: "IAMI",
        reg_Type: "Exhibitor",
        tech_Sem: true
    } )

    const newAttendee3 = await Attendee.create( {
        expo_Year: 2025,
        name_First: "Lynnda",
        name_Last: "Nelson",
        contact_Email: "lynnda@iami411.org",
        contact_Phone: "323587468",
        contact_Employer: "ICOR",
        reg_Type: "Attendee",
        tech_Sem: true
    } )

    const newLead2 = await Lead.create( {
        expo_Year: 2025,
        contact_Employer: 2,
        attendee_Id: 1,
        scan_Company_Id: 456453,
        name_First: "Katy",
        name_Last: "Taylor",
        email: "katy@iami411.org",
        phone: "323587468",
        employer: "IAMI",
        score: 5,
        comment: "She's so cool."
    } )

    const newLead3 = await Lead.create( {
        expo_Year: 2025,
        contact_Employer: 3,
        attendee_Id: 2,
        scan_Company_Id: 832387,
        name_First: "Lynnda",
        name_Last: "Nelson",
        email: "lynnda@iami411.org",
        phone: "6068545684",
        employer: "IAMI",
        score: 5,
        comment: "She's so cool."
    } )

    const newScan = await Scan.create( {
        expo_Year: 2025,
        company_Id: 2,
        lead_Id: 1,
        lead_Score: 2,
        company_Comments: "She's really good at what she does."
    } )

    const newScan2 = await Scan.create( {
        expo_Year: 2025,
        company_Id: 2,
        lead_Id: 2,
        lead_Score: 1,
        company_Comments: "Literally the best."
    } )

    const newScan3 = await Scan.create( {
        expo_Year: 2025,
        company_Id: 3,
        lead_Id: 1,
        lead_Score: 5,
        company_Comments: "She's amazing."
    } )

    console.log( newExpo )
    console.log( newLead2 )
    console.log( newLead3 )
    console.log( newAttendee2 )
    console.log( newAttendee3 )
    console.log( newScan )
    console.log( newScan2 )
    console.log( newScan3 )
    console.log( newCompany2 )
    console.log( newCompany3 )
}