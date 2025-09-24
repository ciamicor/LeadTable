import http from '../http-common'

export default class TechSessionDataService {
  create(data: any) {
    return http.post('/techsession', data)
  }

  getAll() {
    return http.get('/techsession')
  }

  get(id: any) {
    return http.get('/techsession/' + id)
  }

  getExpoAttendees(client: any, year: any) {
    return http.get('/techsession/client/' + client + '/year/' + year)
  }

  update(id: any, data: any) {
    return http.put('/techsession/' + id, data)
  }

  delete(id: any) {
    return http.delete('/techsession/' + id)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const techSessionService = new TechSessionDataService()

/*-| Create Attendees |----+----+---+----+---+----+---+----+---*/
async function createTechSession_Service(
  techSession: any,
  client: any,
  year: any,
) {
  console.log('Create Attendee Service: ', techSession)
  const data = {
    expo_Client: client,
    expo_Year: year,
    title: techSession.title,
    subtitle: techSession.subtitle,
    time_Start: techSession.time_Start,
    time_End: techSession.time_End,
    location: techSession.location,
    track: techSession.track,
    about: techSession.about,
    objectives: techSession.objectives,
  }
  console.log(data)
  try {
    let newTechSession = await techSessionService.create(data)
    techSession.id = newTechSession.data.id
    console.log(newTechSession.data)
    return techSession = newTechSession.data
  } catch (e: any) {
    console.error("Error Name:", e.name);
    console.error("Error Message:", e.message);
    console.error("Error Stack:", e.stack);
    console.error("Tried to create tech session:", techSession);
  }
}

/*-| Update Attendee
---+----+---+----+---+----+---+----+---*/
async function updateAttendee_Service(id: any, techSession: any) {
  console.log('Updating Tech Session: ', techSession.title)
  const data = {
    title: techSession.title,
    subtitle: techSession.subtitle,
    time_Start: techSession.time_Start,
    time_End: techSession.time_End,
    location: techSession.location,
    track: techSession.track,
    about: techSession.about,
    objectives: techSession.objectives,
  }
  console.log("Update Attendee data: ", data)
  try {
    let updatedAttendee = await techSessionService.update(id, data)
    console.log(updatedAttendee)
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get All Attendees
---+----+---+----+---+----+---+----+---*/
async function getAllTechSessions_Service(list: any) {
  try {
    let allTechSessions = await techSessionService.getAll()
    // console.log(allAttendees.data)
    return allTechSessions.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Attendees By Expo
---+----+---+----+---+----+---+----+---*/
async function getExpoTechSessions_Service(client: any, year: any) {
  try {
    let allTechSessions = await techSessionService.getExpoAttendees(client, year)
    console.log(allTechSessions.data)
    return allTechSessions.data
  } catch (e) {
    console.log(e)
  }
}

export {
  getAllTechSessions_Service,
  createTechSession_Service,
  getExpoTechSessions_Service,
  updateAttendee_Service
}

