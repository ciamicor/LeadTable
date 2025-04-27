import http from '../http-common'

export default class uploadAttendeeDataService {
  createAttendeeUpload(data: any) {
    return http.post('/upload', data)
  }

  getAllAttendeeUploads(client: any) {
    return http.get('/upload/client/' + client)
  }

  getAttendeeUpload(id: any) {
    return http.get('/upload/' + id)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const uploadAttendeeService = new uploadAttendeeDataService()

/*-| Create Attendees |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createUpload_Service(client: any, year: any) {
  console.log('Create Upload Service: ', client, year)
  const data = {
    expo_Client: client,
    expo_Year: year,
  }
  console.log(data)
  try {
    let newUpload = await uploadAttendeeService.createAttendeeUpload(data)
    let upload = {
      id: newUpload.data.id,
      expo_Year: newUpload.data.expo_Year,
      expo_Client: newUpload.data.expo_Client,
    }
    console.log(upload)
    return upload
  } catch (e: any) {
    console.error("Error Name:", e.name);
    console.error("Error Message:", e.message);
    console.error("Error Stack:", e.stack);
    console.error("Tried to create upload:", upload);
  }
}

/*-| Get Uploads By Client |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getAttendeeUploads_Service(client: any) {
  try {
    let foundUploads = await uploadAttendeeService.getAllAttendeeUploads(client)
    console.log(foundUploads)
    return foundUploads.data
  } catch (e) {
    console.error("Couldn't find that upload", e)
  }
}

/*-| Get Uploads By Client |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getAttendeeUpload_Service(id: any) {
  try {
    let foundUpload = await uploadAttendeeService.getAttendeeUpload(id)
    console.log("Found Upload: ", foundUpload)
    return foundUpload.data
  } catch (e) {
    console.error("Couldn't find that upload", e)
  }
}

export {createUpload_Service, getAttendeeUploads_Service, getAttendeeUpload_Service}

