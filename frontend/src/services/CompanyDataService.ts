import http from '../http-common'

export default class CompanyDataService {

  getAll() {
    return http.get('/company')
  }

  create(data: any) {
    return http.post(`/company/${data}`)
  }
}
