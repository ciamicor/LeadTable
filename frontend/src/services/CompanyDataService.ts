import http from '../http-common'
import { db } from '@/db.ts'

export default class CompanyDataService {
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
async function createCompany_Service(companyObject: any, year: number) {
  console.log(companyObject.value)
  const data = {
    id: companyObject.value.id,
    login_URL: companyObject.value.autoLoginUrl,
    name: companyObject.value.name,
    expo_Year: year
  }
  console.log(data)
  await companyService.create(data)
    .then((response: any) => {
      companyObject.id = response.data.id
      console.log(response.data)
      companyObject = null
    })
    .catch((e: any) => {
      console.log(e)
    })
}

/*-| Get by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getCompanyById_Service(id: any, companyObject: any) {
  await companyService.get(id)
    .then((response) => {
      companyObject.value = response.data
      console.log('company: ', companyObject.value)
    })
    .catch((e) => {
      console.log(e)
    })
}

/*-| Get Profiles from DB |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function getLocalCompanyData_Service(p: any) {
  await db.profile.get(1)
    .then((res) => {
      let companyLocalHold: any = res
      console.log('company local data service: ', p)

      p.id = companyLocalHold.ex_Id
      p.name = companyLocalHold.name
      p.login_Url = companyLocalHold.login_Url
      p.lead_Ret = companyLocalHold.lead_Ret

      console.log('id: ', p.id)
      console.log('name: ', p.name)
      console.log('login_Url: ', p.login_Url)
      console.log('lead_Ret: ', p.lead_Ret)
      console.log('expo_Year: ', p.expo_Year)
      console.log('expo_Client: ', p.expo_Client)
      return p
    })
}

export { getCompanyById_Service, createCompany_Service, getLocalCompanyData_Service }
