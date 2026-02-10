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
async function sendRegConfirmEmail_Service(a: any, e: any,) {
  console.log('Sending confirmation email to ', a.name_First)
  const data = {
    attendee: a,
    event: e,
  }
  console.log(data)
  try {
    console.log('Trying email on the frontend')
    let email = await regEmailService.create(data)
    console.log('Email sent!')
    console.log(email.data)
  } catch (e: any) {
    console.error("Ouch. I got an error when sending that email. ");
    console.error(e.stack);
    console.error("Tried to send registration confirmation to: ", a);
  }
}

export {
  sendRegConfirmEmail_Service
}
