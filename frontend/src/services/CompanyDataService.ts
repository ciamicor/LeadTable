import http from '../http-common'

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

export { getCompanyById_Service, createCompany_Service }
