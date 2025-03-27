import http from '../http-common'

export default class ScanDataService {

  getAll() {
    return http.get('/scan')
  }

  get(id: any) {
    return http.get("/scan/" + id)
  }

  create(data: any) {
    return http.post("/scan", data)
  }
}
