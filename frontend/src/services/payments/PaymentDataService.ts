import http from '../../http-common'

export default class PaymentDataService {
  create(data: any) {
    return http.post('/payment', data)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const paymentService = new PaymentDataService()

/*-| Create Payment
---+----+---+----+---+----+---+----+---*/
async function createPayment_Service(paymentInfo: any, payData: any) {
  console.log('Create payment service: ', paymentInfo)
  const data = {
    nameFirst: paymentInfo.nameFirst,
    nameLast: paymentInfo.nameLast,
    attendeeId: paymentInfo.attendeeId,
    payerEmail: paymentInfo.payerEmail,
    eventId: paymentInfo.eventId,
    eventClient: paymentInfo.eventClient,
    eventYear: paymentInfo.eventYear,
    productId: paymentInfo.productId,
    processorId: paymentInfo.processorId,
    paymentSuccess: paymentInfo.paymentSuccess,
    details: payData,
    isSandbox: paymentInfo.isSandbox,
  }
  console.log(data)
  try {
    let newPayment = await paymentService.create(data)
    // attendee.id = newAttendee.data.id
    // console.log(newAttendee.data)
    // return attendee = newAttendee.data // return payment info to frontend variable
  } catch (e: any) {
    console.error("Error Name:", e.name);
    console.error("Error Message:", e.message);
    console.error("Error Stack:", e.stack);
    console.error("Tried to create payment", payData);
  }
}

export {
  createPayment_Service
}

