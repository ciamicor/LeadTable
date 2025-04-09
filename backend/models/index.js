const Expo = require( './expo' )
const Lead = require( './lead' )
const Company = require( './company' )
const Scan = require( './scan' )
const Attendee = require( './attendee' )

Lead.belongsTo( Company, { foreignKey: 'scan_Company_Id' } )

module.exports = {
  Scan,
  Lead,
  Company,
  Expo,
  Attendee
}