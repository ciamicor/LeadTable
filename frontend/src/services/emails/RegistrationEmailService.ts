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
    event: {
      "expo_Client": e.expo_Client,
      "clientFull": e.clientFull,
      "name": e.name,
      "contactEmail": e.contactEmail,
      "dateStart": e.dateStart,
      "expoFp_MapUrl": e.expoFp_MapUrl,
      "webpage": e.webpage,
      "logoUrl_Color": e.logoUrl_Color,
    },
  }
  console.log(data)
  try {
    console.log('Trying email on the frontend')
    let newEmail = await regEmailService.create(data)
    console.log('Email sent!')
    console.log(newEmail.data)
  } catch (e: any) {
    console.error("Ouch. I got an error when sending that email. ");
    console.error(e);
    console.error("Tried to send registration confirmation to: ", a);
  }
}

export {
  sendRegConfirmEmail_Service
}
