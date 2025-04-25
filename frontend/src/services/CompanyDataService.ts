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
}

/*-| Functions |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const companyService = new CompanyDataService()

/*-| Create |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createCompany_Service(companyObject: any, year: number, client: string) {
  console.log("Creating company: ", companyObject.value)
  const data = {
    id: companyObject.value.id,
    login_URL: companyObject.value.autoLoginUrl,
    name: companyObject.value.name,
    lead_Ret: companyObject.value.lead_Ret,
    expo_Year: year,
    expo_Client: client,
  }
  console.log(data)
  let newCompany = await companyService.create(data)
  try {
    companyObject.id = newCompany.data.id
    console.log(newCompany.data)
    companyObject = null
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getCompanyById_Service(id: any, companyObject: any = null) {
  let company = await companyService.get(id)
  try {
    console.log('company: ', companyObject)
    console.log('response: ', company)
    if (companyObject !== null) {
      companyObject.value = company.data
      console.log('company: ', companyObject.value)
    } else {
      return company
    }
  } catch (error) {
    console.error('Error getting company by ID: ', error)
  }
}

/*-| Get Profiles from DB |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function getLocalCompanyData_Service(c: any) {
  let profile = await db.profile.get(1)
  try {
    let companyLocalHold: any = profile
    console.log('company local data service: ', c)
    console.log('company local data service: ', profile)

    if (profile) {
      c.id = companyLocalHold.id
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

export {getCompanyById_Service, createCompany_Service, getLocalCompanyData_Service}
