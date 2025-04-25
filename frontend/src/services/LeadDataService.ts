import http from '../http-common'

class LeadDataService {
  create(data: any) {
    return http.post('/lead', data)
  }

  getAll() {
    return http.get('/lead')
  }

  getAllExhibLeads(id: any) {
    return http.get('/lead/exhibitor/' + id)
  }

  get(id: any) {
    return http.get('/lead/' + id)
  }

  update(id: any, data: any) {
    return http.put('/lead/', data)
  }

  delete(id: any) {
    return http.delete('/lead/' + id)
  }

  deleteAll() {
    return http.delete('/lead')
  }

  findByTitle(title: any) {
    return http.get('/lead?title=${title}')
  }
}

/*-| Functions |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const leadService = new LeadDataService()

/*-| Create Leads |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createLead_Service(lead: any) {
  console.log('Lead Service: ', lead)
  const data = {
    expo_Client: lead.expo_Client,
    expo_Year: lead.expo_Year,
    attendee_Id: lead.attendee_Id,
    scan_Company_Id: lead.scan_Company_Id,
    name_First: lead.name_First,
    name_Last: lead.name_Last,
    email: lead.email,
    phone: lead.phone,
    employer: lead.employer,
    address: lead.address,
    title: lead.title,
    score: lead.score,
    comment: lead.comment
  }
  console.log(data)
  try {
    let newLead = await leadService.create(data)
    lead.id = newLead.data.id
    console.log(newLead.data)
    lead = null
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get Single Leads |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getLead_Service(id: any) {
  try {
    let lead = await leadService.get(id)
    id.value = lead.data
    console.log(lead.data)
  } catch (e) {
    console.log(e)
  }
}

/*-| Get All Leads by Exhibitor Company ID |-*/

/*---+----+---+----+---+----+---+----+---*/

async function getAllCompanyLeads_Service(cId: any, list: any) {
  try {
    let leads = await leadService.getAllExhibLeads(cId)
    list.value = leads.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get All Leads |-*/

/*---+----+---+----+---+----+---+----+---*/

async function getAllLeads_Service(list: any) {
  try {
    let leads = await leadService.getAll()
    list.value = leads.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Delete a Lead by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function deleteLead_Service(id: any) {
  try {
    let lead = await leadService.delete(id)
    console.log(lead.data)
  } catch (e) {
    console.log(e)
  }
}

export {createLead_Service, getAllLeads_Service, deleteLead_Service, getAllCompanyLeads_Service}
