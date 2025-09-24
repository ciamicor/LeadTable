import http from '../http-common'
import {db} from '@/db.ts'

class CompanyDataService {
  create(data: any) {
    return http.post('/company', data)
  }

  getAll() {
    return http.get('/company')
  }

  get(id: any) {
    return http.get('/company/' + id)
  }

  updateLeadRet(id: any, data: any) {
    return http.put('/company/' + id, data)
  }
}

/*-| Functions |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const companyService = new CompanyDataService()

/*-| Create
---+----+---+----+---+----+---+----+---*/
async function createCompany_Service(companyObject: any) {
  console.log("Creating company: ", companyObject)
  const data = {
    id: companyObject.id,
    login_URL: companyObject.autoLoginUrl,
    name: companyObject.name,
    lead_Ret: companyObject.lead_Ret,
    expo_Year: companyObject.expo_Year,
    expo_Client: companyObject.expo_Client,
  }
  console.log(data)
  try {
    let newCompany = await companyService.create(data)
    console.log(newCompany.data)
    return companyObject.id = newCompany.data.id
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get by ID
---+----+---+----+---+----+---+----+---*/
async function getCompanyById_Service(id: any, companyObject: any = null) {
  try {
    let company = await companyService.get(id)
    console.log('company object: ', companyObject)
    console.log('response: ', company)
    if (companyObject !== null) {
      companyObject.value = company.data
      console.log('company: ', companyObject.value)
    } else {
      return company.data
    }
  } catch (error) {
    console.error('Error getting company by ID: ', error)
  }
}

/*-| Get Profiles from DB |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function getLocalCompanyData_Service(c: any) {
  try {
    let profile = await db.profile.get(1)
    let companyLocalHold: any = profile
    console.log('Company LocalData Service: ', c)
    console.log('Company LocalData Service: ', profile)

    if (profile) {
      c.id = companyLocalHold.ex_Id
      c.name = companyLocalHold.name
      c.login_Url = companyLocalHold.login_Url
      c.lead_Ret = companyLocalHold.lead_Ret
      c.expo_Year = companyLocalHold.expo_Year
      c.expo_Client = companyLocalHold.expo_Client

      return c
    }
  } catch (error) {
    console.error('I don\'t think there\'s a company stored locally.', error)
  }
}

async function updateCompanyLeadRet_Service(id: any, retStatus: boolean) {
  console.log("Updating company: ", id)
  const data = {
    lead_Ret: retStatus
  }
  console.log('Updating Lead Retrieval to: ', data)
  try {
    await companyService.updateLeadRet(id, data)
  } catch (e: any) {
    console.log(e)
  }
}

export {
  getCompanyById_Service,
  createCompany_Service,
  getLocalCompanyData_Service,
  updateCompanyLeadRet_Service
}
