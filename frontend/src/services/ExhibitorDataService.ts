import http from '../http-common'
import { db } from '@/db.ts'

class ExhibitorDataService {
  create(data: any) {
    return http.post('/company', data)
  }

  getAll() {
    return http.get('/company')
  }

  get(cId: any) {
    return http.get('/company/' + cId)
  }

  update(id: any, data: any) {
    return http.put('/company/' + id, data)
  }
}

/*-| Functions
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const exhibitorService = new ExhibitorDataService()

/*-| Create exhibitor
---+----+---+----+---+----+---+----+---*/
export async function createExhibitor_Service(companyObject: any) {
  console.log("Creating company: ", companyObject)
  const data = {
    id: companyObject.id,
    expoId: companyObject.expoId,
    login_Url: companyObject.login_Url,
    name: companyObject.name,
    lead_Ret: companyObject.lead_Ret,
    expo_Year: companyObject.expo_Year,
    expo_Client: companyObject.expo_Client,
  }
  console.log(data)
  try {
    let newExhibitor = await exhibitorService.create(data)
    console.log(newExhibitor.data)
    return companyObject.id = newExhibitor.data.id
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get by exhibitor & Expo ID
---+----+---+----+---+----+---+----+---*/
export async function getExhibitor_Service(cId: any, exhibitorObject: any = null) {
  try {
    let exhibitor = await exhibitorService.get(cId)
    console.log('Exhibitor object: ', exhibitorObject)
    console.log('response: ', exhibitor)
    if (exhibitorObject !== null) {
      exhibitorObject.value = exhibitor.data
      console.log('company: ', exhibitorObject.value)
    }
    else {
      return exhibitor.data
    }
  } catch (error) {
    console.error('Error getting company by ID: ', error)
  }
}

/*-| Get Profiles from DB
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
export async function getLocalExhibitor_Service(c: any) {
  try {
    let profile = await db.profile.get(1)
    let exhibitorLocalHold: any = profile
    console.log('exhibitor LocalData Service: ', c)
    console.log('exhibitor LocalData Service: ', profile)

    if (profile) {
      c.id = exhibitorLocalHold.ex_Id
      c.name = exhibitorLocalHold.name
      c.login_Url = exhibitorLocalHold.login_Url
      c.lead_Ret = exhibitorLocalHold.lead_Ret
      c.expo_Year = exhibitorLocalHold.expo_Year
      c.expo_Client = exhibitorLocalHold.expo_Client

      return c
    }
  } catch (error) {
    console.error('I don\'t think there\'s a company stored locally.', error)
  }
}

/*-| Update exhibitor in Database
---+----+---+----+---+----+---+----+---*/
export async function updateExhibitor_Service(id: any, retStatus: boolean) {
  console.log("Updating company: ", id)
  const data = {
    lead_Ret: retStatus
  }
  console.log('Updating Lead Retrieval to: ', data)
  try {
    await exhibitorService.update(id, data)
  } catch (e: any) {
    console.log(e)
  }
}
