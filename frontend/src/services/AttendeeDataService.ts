import http from "../http-common"
import { toTitleCase_Service } from "@/services/functions/TextManipulationService.ts"

export default class AttendeeDataService {
  create(data: any) {
    return http.post("/attendee", data)
  }

  getAll() {
    return http.get("/attendee")
  }

  get(id: any) {
    return http.get("/attendee/" + id)
  }

  getUploadAttendee(id: any) {
    return http.get("/attendee/upload/" + id)
  }

  getExpoAttendees(client: any, year: any) {
    return http.get("/attendee/client/" + client + "/year/" + year)
  }

  checkExpoAttendeeDupe(client: any, year: any, email: string) {
    return http.get(`/attendee/match/client/${client}/year/${year}?email=${email}`)
  }

  update(id: any, data: any) {
    return http.put("/attendee/" + id, data)
  }

  delete(id: any) {
    return http.delete("/attendee/" + id)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const attendeeService = new AttendeeDataService()

/*-| Create Attendees
---+----+---+----+---+----+---+----+---*/
async function createAttendee_Service(attendee: any, client: any, year: any, upload: any = null) {
  console.log("Create Attendee Service: ", attendee)
  const fname = attendee.name_First ? toTitleCase_Service(attendee.name_First) : attendee.name_First
  const lname = attendee.name_Last ? toTitleCase_Service(attendee.name_Last) : attendee.name_Last
  const email = attendee.contact_Email ? attendee.contact_Email.toLowerCase() : attendee.contact_Email
  const title = attendee.title ? toTitleCase_Service(attendee.title) : attendee.title
  const attendeeNew = {
    expo_Client: client,
    expo_Year: year,
    name_First: fname,
    name_Last: lname,
    contact_Email: email,
    contact_Phone: attendee.contact_Phone,
    contact_Employer: attendee.contact_Employer,
    address_Line1: attendee.address_Line1,
    address_Line2: attendee.address_Line2,
    address_City: attendee.address_City,
    address_State: attendee.address_State,
    address_Zip: attendee.address_Zip,
    address_Country: attendee.address_Country,
    title: title,
    regType: attendee.regType,
    techSessions: attendee.techSessions,
    customFields: attendee.customFields,
    upload_Id: upload
  }
  console.log(attendeeNew)
  try {
    let newAttendee = await attendeeService.create(attendeeNew)
    attendee.id = newAttendee.data.id
    console.log(newAttendee.data)
    return attendee = newAttendee.data
  } catch (e: any) {
    console.error("Error when creating that attendee.");
    console.error(e);
    console.error("Tried to create attendee:", attendee);
  }
}

/*-| Update Attendee
---+----+---+----+---+----+---+----+---*/
async function updateAttendee_Service(id: any, attendee: any) {
  console.log("Updating Attendee: ", attendee)
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
    regType: attendee.regType,
    techSessions: attendee.techSessions,
    customFields: attendee.customFields
  }
  console.log("Update Attendee addresses: ", data)
  try {
    let updatedAttendee = await attendeeService.update(id, data)
    console.log(updatedAttendee.data)
    return updatedAttendee.data
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get All Attendees
---+----+---+----+---+----+---+----+---*/
async function getAllAttendees_Service(list: any) {
  try {
    let allAttendees = await attendeeService.getAll()
    // console.log(allAttendees.addresses)
    return allAttendees.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Attendee By ID
---+----+---+----+---+----+---+----+---*/
async function getAttendee_Service(id: number) {
  try {
    let attendee = await attendeeService.get(id)
    console.log(attendee)
    return attendee.data
  } catch (e: any) {
    console.log(e)
    return {error: `${e.message}`}
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

/*-| Check Attendee Dupe in Expo
---+----+---+----+---+----+---+----+---*/
export async function checkExpoAttendeeDupe_Service(client: any, year: any, email: string) {
  try {
    let dupe = await attendeeService.checkExpoAttendeeDupe(client, year, email)
    console.log("Duplicate check result: ", dupe.data)
    return dupe.data
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

/*-| Delete an Attendee by ID
---+----+---+----+---+----+---+----+---*/
export async function deleteAttendee_Service(id: any) {
  try {
    let attendee = await attendeeService.delete(id)
    console.log("deleted attendee from server: ", attendee.data)
  } catch (e) {
    console.log(e)
  }
}

export {
  getAllAttendees_Service,
  createAttendee_Service,
  getAttendeesUploadId_Service,
  getExpoAttendees_Service,
  updateAttendee_Service,
  getAttendee_Service
}

