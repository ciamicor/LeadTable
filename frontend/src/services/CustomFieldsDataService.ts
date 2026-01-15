import http from '../http-common'

export default class CustomFieldDataService {
  getCustomFields(eventId: number) {
    return http.get('/customfield/event/' + eventId)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const customFieldService = new CustomFieldDataService()

/*-| Get Attendees By Expo
---+----+---+----+---+----+---+----+---*/
async function getCustomFields_Service(eventId: number) {
  try {
    let customFields = await customFieldService.getCustomFields(eventId)
    console.log(customFields.data)
    return customFields.data
  } catch (e) {
    console.log(`Error getting custom fields for event ${eventId}`, e)
  }
}

export {
  getCustomFields_Service
}
