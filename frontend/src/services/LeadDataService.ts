import http from '../http-common'

export default class LeadDataService {
  getAll() {
    return http.get('/leads')
  }

  get(id: any) {
    return http.get(`/leads/${id}`)
  }

  create(data: any) {
    return http.post(`/leads/${data}`)
  }

  update(id: any, data: any) {
    return http.put(`/leads/${id}`, data)
  }

  delete(id: any) {
    return http.delete(`/leads/${id}`)
  }

  deleteAll() {
    return http.delete(`/leads`)
  }

  findByTitle(title: any) {
    return http.get(`/leads?title=${title}`)
  }
}
