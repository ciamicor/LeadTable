import Expo from './expo.js';
import Lead from './lead.js';
import Company from './company.js';
import Scan from './scan.js';
import Attendee from './attendee.js';
import UploadAttendee from './uploadAttendee.js';
import TechSession from './techSession.js';

Lead.belongsTo( Company, { foreignKey: 'scan_Company_Id' } )

export {
    Scan,
    Lead,
    Company,
    Expo,
    Attendee,
    UploadAttendee,
    TechSession
}