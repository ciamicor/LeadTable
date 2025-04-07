import http from '../http-common'

export default class LeadDataService {

  create(data: any) {
    return http.post("/lead", data)
  }

  getAll() {
    return http.get("/lead")
  }

  get(id: any) {
    return http.get("/lead/" + id)
  }

  update(id: any, data: any) {
    return http.put("/lead/", data)
  }

  delete(id: any) {
    return http.delete("/lead/" + id)
  }

  deleteAll() {
    return http.delete("/lead")
  }

  findByTitle(title: any) {
    return http.get("/lead?title=${title}")
  }
}

/*-| Functions |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const leadService = new LeadDataService()

/*-| Create Leads |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createLead_Service(lead: any) {
  console.log("Lead Service: ", lead)
  const data = {
    expo_Year: lead.expo_Year,
    attendee_Id: lead.attendee_Id,
    scan_Company_Id: lead.scan_Company_Id,
    name_First: lead.name_First,
    name_Last: lead.name_Last,
    email: lead.email,
    phone: lead.phone,
    employer: lead.employer,
    score: lead.score,
    comment: lead.comment
  }
  console.log(data);
  await leadService.create(data)
    .then((response: any) => {
      lead.id = response.data.id
      console.log(response.data)
      lead = null
    })
    .catch((e: any) => {
      console.log(e)
    })
}

/*-| Get All Leads |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getAllLeads_Service(list: any) {
  await leadService.getAll()
    .then((response) => {
      list.value = response.data
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

/*-| Delete a Lead by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function deleteLead_Service(id: any) {
  await leadService.delete(id)
    .then((response) => {
      console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

export {createLead_Service, getAllLeads_Service, deleteLead_Service}
