import http from '../http-common'
import LeadDataService from '@/services/LeadDataService.ts'

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
async function createAttendee_Service(attendee: any) {
  console.log('Create Attendee Service: ', attendee)
  const data = {
    expo_Client: attendee.expo_Client,
    expo_Year: attendee.expo_Year,
    name_First: attendee.name_First,
    name_Last: attendee.name_Last,
    contact_Email: attendee.contact_Email,
    contact_Phone: attendee.contact_Phone,
    contact_Employer: attendee.contact_Employer,
    title: attendee.title,
    reg_Type: attendee.reg_Type,
    tech_Sem: attendee.tech_Sem
  }
  console.log(data)
  await attendeeService.create(data)
    .then((response: any) => {
      attendee.id = response.data.id
      console.log(response.data)
      // attendee = null
      attendee = response.data
    })
    .catch((e: any) => {
      console.log(e)

      window.alert('Attendee with email ' + attendee.contact_Email + ' already exists.')
    })
}

/*-| Get All Attendees |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getAllAttendees_Service(list: any) {
  await attendeeService.getAll()
    .then((response) => {
      list.value = response.data
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

export { getAllAttendees_Service, createAttendee_Service }

