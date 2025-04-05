import http from '../http-common'

export default class CompanyDataService {
  create(data: any) {
    return http.post("/company", data)
  }

  getAll() {
    return http.get('/company')
  }

  get(id: any) {
    return http.get("/company/" + id)
  }
}

/*-| Functions |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const companyService = new CompanyDataService()

/*-| Get by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getCompanyById_Service(id: any, companyObject: any) {
  await companyService.get(id)
    .then((response) => {
      companyObject.value = response.data
      console.log("company: ", companyObject)
    })
    .catch((e) => {
      console.log(e)
    })
}

export {getCompanyById_Service}
