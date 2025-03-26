const Expo = require( './expo' );
const Lead = require( './lead' );
const Company = require( './company' );
const Scan = require( './scan' );

Expo.hasMany( Lead, {
    foreignKey: 'expo_Id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
} )

Expo.hasMany( Company, {
    foreignKey: 'expo_Id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
} )

Expo.hasMany( Scan, {
    foreignKey: 'expo_Id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
} )

Scan.belongsTo( Company, { foreignKey: 'company_Id' } )
Scan.belongsTo( Lead, { foreignKey: 'lead_Id' } )

Lead.belongsTo( Company, { foreignKey: 'contact_Employer' } )

module.exports = {
    Scan,
    Lead,
    Company,
    Expo
};