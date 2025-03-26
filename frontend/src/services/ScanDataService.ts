import http from '../http-common'

export default class ScanDataService {

  getAll() {
    return http.get('/scan')
  }

  create(data: any) {
    return http.post(`/scan/${data}`)
  }
}
