const Expo = require( './expo' );
const Lead = require( './lead' );
const Company = require( './company' );
const Scan = require( './scan' );
const Attendee = require( './attendee' );

Expo.hasMany( Lead, {
    foreignKey: 'expo_Year',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
} )

Expo.hasMany( Company, {
    foreignKey: 'expo_Year',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
} )

Expo.hasMany( Attendee, {
    foreignKey: 'expo_Year',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
} )

Lead.belongsTo( Company, { foreignKey: 'scan_Company_Id' } )

module.exports = {
    Scan,
    Lead,
    Company,
    Expo,
    Attendee
};