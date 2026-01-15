import http from '../../http-common'

export default class PaymentProcessorDataService {
  getPaymentProcessor(eventId: number) {
    return http.get('/paymentprocessor/event/' + eventId)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const paymentProcessorService = new PaymentProcessorDataService()

/*-| Get Attendees By Expo
---+----+---+----+---+----+---+----+---*/
async function getPaymentProcessor_Service(eventId: number) {
  try {
    let paymentProcessor = await paymentProcessorService.getPaymentProcessor(eventId)
    console.log(paymentProcessor.data)
    return paymentProcessor.data
  } catch (e) {
    console.log(e)
  }
}

export {
  getPaymentProcessor_Service
}
