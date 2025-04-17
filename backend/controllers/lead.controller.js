const { Lead } = require( '../models' )
const { where } = require( 'sequelize' )

// Controller method to create a new lead
exports.createLead = async ( req, res ) => {
  const {
    expo_Client,
    year,
    attendee_Id,
    scan_Company_Id,
    name_First,
    name_Last,
    email,
    phone,
    employer,
    address,
    title,
    score,
    comment
  } = req.body
  console.log( 'Creating Lead: ', req.body )
  try {
    const newLead = await Lead.create( {
      expo_Client,
      year,
      attendee_Id,
      scan_Company_Id,
      name_First,
      name_Last,
      email,
      phone,
      employer,
      address,
      title,
      score,
      comment
    } )
    res.status( 201 ).json( newLead )
  } catch ( error ) {
    console.error( 'Error while creating lead: ', error )

    if ( error.name === 'SequelizeForeignKeyConstraintError' ) {
      return res.status( 400 ).json( {
        error: 'Invalid foreign key',
        message: 'Referenced attendee or company does not exist'
      } )
    }

    res.status( 500 ).json( {
      error: 'Something went wrong on the server.',
      details: error?.message || 'Unknown error',
      stack: error.stack
    } )
  }
}

// Controller method to get all leads
exports.getAllLeads = async ( req, res ) => {
  try {
    const leads = await Lead.findAll( {} )
    if ( leads ) {
      res.json( leads )
    } else {
      res.status( 404 ).json( { error: 'No leads found.' } )
    }
  } catch ( error ) {
    console.error( 'error in controller: ', error )
    res.status( 500 ).json( {
      error: 'Something went wrong.',
      details: error?.message || 'Unknown error'
    } )
  }
}

// Controller method to get a lead by ID
exports.getLeadById = async ( req, res ) => {
  const id = req.params.id
  try {
    const lead = await Lead.findByPk( id )
    if ( lead ) {
      res.json( lead )
    } else {
      res.status( 404 ).json( { error: 'Lead not found' } )
    }
  } catch ( error ) {
    console.error( 'error in controller: ', error )
    res.status( 500 ).json( {
      error: 'Something went wrong.',
      details: error?.message || 'Unknown error'
    } )
  }
}

// Controller method to update a lead by ID
exports.updateLead = async ( req, res ) => {
  const id = req.params.id
  const { name_First, name_Last, contact_Email, contact_Phone, contact_Employer } = req.body
  try {
    const lead = await Lead.findByPk( id )
    if ( lead ) {
      lead.name_First = name_First
      lead.name_Last = name_Last
      lead.contact_Email = contact_Email
      lead.contact_Phone = contact_Phone
      lead.contact_Employer = contact_Employer
      await lead.save()
      res.json( lead )
    } else {
      res.status( 404 ).json( { error: 'Lead not found' } )
    }
  } catch ( error ) {
    console.error( 'error in controller: ', error )
    res.status( 500 ).json( {
      error: 'Something went wrong.',
      details: error?.message || 'Unknown error'
    } )
  }
}

// Controller method to delete a lead by ID
exports.deleteLead = async ( req, res ) => {
  const id = req.params.id
  try {
    const lead = await Lead.findByPk( id )
    if ( lead ) {
      await lead.destroy()
      res.json( lead )
    } else {
      res.status( 404 ).json( { error: 'Lead not found' } )
    }
  } catch ( error ) {
    console.error( 'error in controller: ', error )
    res.status( 500 ).json( {
      error: 'Something went wrong.',
      details: error?.message || 'Unknown error'
    } )
  }
}
