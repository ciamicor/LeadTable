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

export { getAllAttendees_Service }

