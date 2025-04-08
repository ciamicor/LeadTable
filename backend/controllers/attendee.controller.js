const { Attendee } = require( '../models' )

// Controller method to get all attendees
exports.getAllAttendees = async ( req, res ) => {
  try {
    const attendees = await Attendee.findAll()
    res.json( attendees )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Internal Server Error' + error.message + error.response.data } )
  }
}

// Controller method to create a new attendee
exports.createAttendee = async ( req, res ) => {
  const {
    expo_Year,
    name_First,
    name_Last,
    contact_Email,
    contact_Phone,
    contact_Employer,
    reg_Type,
    tech_Sem
  } = req.body
  try {
    const newAttendee = await Attendee.create( {
      expo_Year,
      name_First,
      name_Last,
      contact_Email,
      contact_Phone,
      contact_Employer,
      reg_Type,
      tech_Sem
    } )
    res.status( 201 ).json( newAttendee )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Internal Server Error' + error.message + error.response.data } )
  }
}

// Controller method to get an attendee by ID
exports.getAttendeeById = async ( req, res ) => {
  const id = req.params.id
  try {
    const attendee = await Attendee.findByPk( id )
    if ( attendee ) {
      res.json( attendee )
    } else {
      res.status( 404 ).json( { error: 'Attendee not found' } )
    }
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Internal Server Error' + error.message + error.response.data } )
  }
}

// Controller method to update an attendee by ID
exports.updateAttendee = async ( req, res ) => {
  const id = req.params.id
  const { name_First, name_Last, contact_Email, contact_Phone, contact_Employer } = req.body
  try {
    const attendee = await Attendee.findByPk( id )
    if ( attendee ) {
      attendee.name_First = name_First
      attendee.name_Last = name_Last
      attendee.contact_Email = contact_Email
      attendee.contact_Phone = contact_Phone
      attendee.contact_Employer = contact_Employer
      await attendee.save()
      res.json( attendee )
    } else {
      res.status( 404 ).json( { error: 'Attendee not found' } )
    }
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Internal Server Error' + error.message + error.response.data } )
  }
}

// Controller method to delete a attendee by ID
exports.deleteAttendee = async ( req, res ) => {
  const id = req.params.id
  try {
    const attendee = await Attendee.findByPk( id )
    if ( attendee ) {
      await attendee.destroy()
      res.json( attendee )
    } else {
      res.status( 404 ).json( { error: 'Attendee not found' } )
    }
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Internal Server Error' + error.message + error.response.data } )
  }
}
