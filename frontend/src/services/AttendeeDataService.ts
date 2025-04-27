import http from '../http-common'

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

/*-| Create Attendees |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createAttendee_Service(attendee: any, client: any, year: any) {
  console.log('Create Attendee Service: ', attendee)
  const data = {
    expo_Client: client,
    expo_Year: year,
    name_First: attendee.name_First,
    name_Last: attendee.name_Last,
    contact_Email: attendee.contact_Email,
    contact_Phone: attendee.contact_Phone,
    contact_Employer: attendee.contact_Employer,
    address: attendee.address,
    title: attendee.title,
    reg_Type: attendee.reg_Type,
    tech_Sem: attendee.tech_Sem
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

/*-| Get All Attendees |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getAllAttendees_Service(list: any) {
  await attendeeService.getAll()
    .then((response) => {
      list.value = response.data
      // console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

/*-| Get Attendees By Expo |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getExpoAttendees_Service(client: any, year: any, list: any) {
  await attendeeService.getExpoAttendees(client, year)
    .then((response) => {
      // console.log(response)
      list.value = response.data
    })
    .catch((e) => {
      console.log(e)
    })
}

export {getAllAttendees_Service, createAttendee_Service, getExpoAttendees_Service}

