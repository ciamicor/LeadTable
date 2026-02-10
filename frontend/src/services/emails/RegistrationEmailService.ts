import http from '../../http-common'

export default class RegistrationEmailDataService {
  create(data: any) {
    return http.post('/emailer/send', data)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const regEmailService = new RegistrationEmailDataService()

/*-| Create Attendees
---+----+---+----+---+----+---+----+---*/
async function sendRegConfirmEmail_Service(attendee: any, event: any,) {
  console.log('Sending confirmation email to ', attendee.name_First)
  const data = {
    attendee: attendee,
    event: event,
  }
  console.log(data)
  try {
    let email = await regEmailService.create(data)
    console.log('Email sent!')
    console.log(email.data)
  } catch (e: any) {
    console.error("Error Name: ", e.name);
    console.error("Error Message: ", e.message);
    console.error("Error Stack: ", e.stack);
    console.error("Tried to send registration confirmation to: ", attendee);
  }
}

export {
  sendRegConfirmEmail_Service
}

