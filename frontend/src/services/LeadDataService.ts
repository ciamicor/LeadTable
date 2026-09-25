import http from "../http-common"
import { db } from "@/db.ts"

class LeadDataService {
  create(data: any) {
    return http.post("/lead", data)
  }

  getAll() {
    return http.get("/lead")
  }

  getAllExhibLeads(id: any) {
    return http.get("/lead/exhibitor/" + id)
  }

  get(id: any) {
    return http.get("/lead/" + id)
  }

  update(id: any, data: any) {
    return http.put("/lead/" + id, data)
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

/*-| Functions
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const leadService = new LeadDataService()

/*-| Create Leads
---+----+---+----+---+----+---+----+---*/
async function createLead_Service(lead: any) {
  console.log("Lead Service: ", lead)
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
    address_Line1: lead.address_Line1,
    address_Line2: lead.address_Line2,
    address_City: lead.address_City,
    address_State: lead.address_State,
    address_Zip: lead.address_Zip,
    address_Country: lead.address_Country,
    title: lead.title,
    score: lead.score,
    comment: lead.comment
  }
  // console.log(data)
  try {
    // return {error: "Debugging!"}
    let newLead = await leadService.create(data)
    lead.id = newLead.data.id
    console.log("Successfully uploaded lead: ", newLead.data)
    return lead
  } catch (e: any) {
    console.log(e)
    return {error: e}
  }
}

export async function saveLocal_Lead(leadId: number, lead: any, syncStatus: boolean) {
  const leadHold = {
    id: leadId,
    synced: syncStatus,
    expo_Client: lead.expo_Client,
    expo_Year: lead.expo_Year,
    attendee_Id: lead.attendee_Id,
    scan_Company_Id: lead.scan_Company_Id,
    name_First: lead.name_First,
    name_Last: lead.name_Last,
    email: lead.email,
    phone: lead.phone,
    employer: lead.employer,
    address_Line1: lead.address_Line1,
    address_Line2: lead.address_Line2,
    address_City: lead.address_City,
    address_State: lead.address_State,
    address_Zip: lead.address_Zip,
    address_Country: lead.address_Country,
    title: lead.title,
    score: lead.score,
    comment: lead.comment
  }

  console.log("Saving Local lead: ", leadHold)
  try {
    const leadLocal = await db.leads.add({
      id: leadId,
      synced: syncStatus,
      expo_Client: leadHold.expo_Client,
      expo_Year: leadHold.expo_Year,
      attendee_Id: leadHold.attendee_Id,
      scan_Company_Id: leadHold.scan_Company_Id,
      name_First: leadHold.name_First,
      name_Last: leadHold.name_Last,
      email: leadHold.email,
      phone: leadHold.phone,
      employer: leadHold.employer,
      address_Line1: leadHold.address_Line1,
      address_Line2: leadHold.address_Line2,
      address_City: leadHold.address_City,
      address_State: leadHold.address_State,
      address_Zip: leadHold.address_Zip,
      address_Country: leadHold.address_Country,
      title: leadHold.title,
      score: leadHold.score,
      comment: leadHold.comment,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    console.log("Successfully added local lead: ", leadLocal)
  } catch (error) {
    console.log(error)
  }
}

/*-| Update Server Lead
---+----+---+----+---+----+---+----+---*/
async function updateLead_Service(id: any, lead: any) {
  console.log("Updating Lead: ", lead)
  const data = {
    name_First: lead.name_First,
    name_Last: lead.name_Last,
    email: lead.email,
    phone: lead.phone,
    employer: lead.employer,
    address_Line1: lead.address_Line1,
    address_Line2: lead.address_Line2,
    address_City: lead.address_City,
    address_State: lead.address_State,
    address_Zip: lead.address_Zip,
    address_Country: lead.address_Country,
    title: lead.title,
    score: lead.score,
    comment: lead.comment
  }
  console.log("Update Lead Data: ", data)
  try {
    let updatedLead = await leadService.update(id, data)
    console.log(updatedLead)
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Update Local Lead
---+----+---+----+---+----+---+----+---*/
export async function updateLocal_Lead(lead: any) {
  const leadHold = {
    id: lead.id,
    synced: lead.syncStatus,
    expo_Client: lead.expo_Client,
    expo_Year: lead.expo_Year,
    attendee_Id: lead.attendee_Id,
    scan_Company_Id: lead.scan_Company_Id,
    name_First: lead.name_First,
    name_Last: lead.name_Last,
    email: lead.email,
    phone: lead.phone,
    employer: lead.employer,
    address_Line1: lead.address_Line1,
    address_Line2: lead.address_Line2,
    address_City: lead.address_City,
    address_State: lead.address_State,
    address_Zip: lead.address_Zip,
    address_Country: lead.address_Country,
    title: lead.title,
    score: lead.score,
    comment: lead.comment,
    updatedAt: new Date()
  }

  console.log("Saving Local lead (HOLD): ", leadHold)
  console.log("Saving Local lead: ", lead)
  try {
    const leadLocal = await db.leads.update(lead.id, {
      expo_Client: lead.expo_Client,
      expo_Year: lead.expo_Year,
      attendee_Id: lead.attendee_Id,
      scan_Company_Id: lead.scan_Company_Id,
      name_First: lead.name_First,
      name_Last: lead.name_Last,
      email: lead.email,
      phone: lead.phone,
      employer: lead.employer,
      address_Line1: lead.address_Line1,
      address_Line2: lead.address_Line2,
      address_City: lead.address_City,
      address_State: lead.address_State,
      address_Zip: lead.address_Zip,
      address_Country: lead.address_Country,
      title: lead.title,
      score: lead.score,
      comment: lead.comment,
      updatedAt: new Date()
    })
    console.log("Successfully added", leadLocal)
  } catch (error) {
    console.log(error)
  }
}

/*-| Get Single Leads
---+----+---+----+---+----+---+----+---*/
async function getLead_Service(id: any) {
  try {
    let lead = await leadService.get(id)
    id.value = lead.data
    console.log(lead.data)
  } catch (e) {
    console.log(e)
  }
}

/*-| Get All Leads by Exhibitor Company ID
---+----+---+----+---+----+---+----+---*/

async function getAllCompanyLeads_Service(cId: any, list: any) {
  try {
    let leads = await leadService.getAllExhibLeads(cId)
    list.value = leads.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get All Leads
---+----+---+----+---+----+---+----+---*/
async function getAllLeads_Service(list: any) {
  try {
    let leads = await leadService.getAll()
    list.value = leads.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Delete a Server Lead by ID
---+----+---+----+---+----+---+----+---*/
export async function deleteLead_Service(id: any) {
  try {
    let lead = await leadService.delete(id)
    console.log("deleted lead from server: ", lead.data)
  } catch (e) {
    console.log(e)
  }
}

export async function deleteLocalLead(id: any) {
  try {
    let lead = db.leads.delete(id)
    console.log("deleted lead locally: ", lead)
  } catch (e) {
    console.log(e)
  }
}

export {
  createLead_Service,
  getAllLeads_Service,
  getAllCompanyLeads_Service,
  updateLead_Service
}
