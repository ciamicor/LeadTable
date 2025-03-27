import http from '../http-common'

export default class CompanyDataService {

  getAll() {
    return http.get('/company')
  }

  get(id: any) {
    return http.get("/company/" + id)
  }

  create(data: any) {
    return http.post("/company", data)
  }
}
