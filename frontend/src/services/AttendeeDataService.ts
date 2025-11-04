import http from '../http-common'
import { titleCase } from "@/services/functions/TextManipulationService.ts";

export default class AttendeeDataService {
  create(data: any) {
    return http.post('/attendee', data)
  }

  getAll() {
    return http.get('/attendee')
  }

  get(id: any) {
    return http.get('/attendee/' + id)
  }

  getUploadAttendee(id: any) {
    return http.get('/attendee/upload/' + id)
  }

  getExpoAttendees(client: any, year: any) {
    return http.get('/attendee/client/' + client + '/year/' + year)
  }

  update(id: any, data: any) {
    return http.put('/attendee/' + id, data)
  }

  delete(id: any) {
    return http.delete('/attendee/' + id)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const attendeeService = new AttendeeDataService()

/*-| Create Attendees
---+----+---+----+---+----+---+----+---*/
async function createAttendee_Service(
  attendee: any,
  client: any,
  year: any,
  upload: any = null
) {
  console.log('Create Attendee Service: ', attendee)
  const data = {
    expo_Client: client,
    expo_Year: year,
    name_First: attendee.name_First, // titleCase(attendee.name_First).trim(),
    name_Last: attendee.name_Last, // titleCase(attendee.name_Last).trim(),
    contact_Email: attendee.contact_Email, // typeof undefined ? '' : attendee.contact_Email.toLowerCase().trim(),
    contact_Phone: attendee.contact_Phone, // typeof undefined ? '' : attendee.contact_Phone.trim(),
    contact_Employer: attendee.contact_Employer, // typeof undefined ? '' : attendee.contact_Employer.trim(),
    address_Line1: attendee.address_Line1, // typeof undefined ? '' : attendee.address_Line1.trim(),
    address_Line2: attendee.address_Line2, // typeof undefined ? '' : attendee.address_Line2.trim(),
    address_City: attendee.address_City, // typeof undefined ? '' : attendee.address_City.trim(),
    address_State: attendee.address_State, // typeof undefined ? '' : attendee.address_State.trim(),
    address_Zip: attendee.address_Zip, // typeof undefined ? '' : attendee.address_Zip.trim(),
    address_Country: attendee.address_Country, // attendee.address_Country,
    title: attendee.title, // typeof undefined ? '' : attendee.title.trim(),
    reg_Type: attendee.reg_Type, // typeof undefined ? '' : attendee.reg_Type,
    tech_Sem: attendee.tech_Sem, // typeof undefined ? '' : attendee.tech_Sem,
    upload_Id: upload
  }
  console.log(data)
  try {
    let newAttendee = await attendeeService.create(data)
    attendee.id = newAttendee.data.id
    console.log(newAttendee.data)
    return attendee = newAttendee.data
  } catch (e: any) {
    console.error("Error Name:", e.name);
    console.error("Error Message:", e.message);
    console.error("Error Stack:", e.stack);
    console.error("Tried to create attendee:", attendee);
  }
}

/*-| Update Attendee
---+----+---+----+---+----+---+----+---*/
async function updateAttendee_Service(id: any, attendee: any) {
  console.log('Updating Attendee: ', attendee)
  const data = {
    name_First: attendee.name_First,
    name_Last: attendee.name_Last,
    contact_Email: attendee.contact_Email,
    contact_Phone: attendee.contact_Phone,
    contact_Employer: attendee.contact_Employer,
    address_Line1: attendee.address_Line1,
    address_Line2: attendee.address_Line2,
    address_City: attendee.address_City,
    address_State: attendee.address_State,
    address_Zip: attendee.address_Zip,
    address_Country: attendee.address_Country,
    title: attendee.title,
    reg_Type: attendee.reg_Type,
    tech_Sem: attendee.tech_Sem,
  }
  console.log("Update Attendee addresses: ", data)
  try {
    let updatedAttendee = await attendeeService.update(id, data)
    console.log(updatedAttendee)
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get All Attendees
---+----+---+----+---+----+---+----+---*/
async function getAllAttendees_Service(list: any) {
  try {
    let allAttendees = await attendeeService.getAll()
    // console.log(allAttendees.data)
    return allAttendees.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Attendees By Expo
---+----+---+----+---+----+---+----+---*/
async function getExpoAttendees_Service(client: any, year: any) {
  try {
    let allAttendees = await attendeeService.getExpoAttendees(client, year)
    console.log(allAttendees.data)
    return allAttendees.data
  } catch (e) {
    console.log(e)
  }
}

async function getAttendeesUploadId_Service(id: any) {
  try {
    let attendees = await attendeeService.getUploadAttendee(id)
    console.log("Attendees in upload: ", attendees)
    return attendees.data
  } catch (e) {
    console.log(e)
  }
}

export {
  getAllAttendees_Service,
  createAttendee_Service,
  getAttendeesUploadId_Service,
  getExpoAttendees_Service,
  updateAttendee_Service
}

