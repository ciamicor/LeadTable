import http from '../http-common'

export default class LeadDataService {
  getAll() {
    return http.get('/lead')
  }

  get(id: any) {
    return http.get(`/lead/${id}`)
  }

  create(data: any) {
    return http.post(`/lead/${data}`)
  }

  update(id: any, data: any) {
    return http.put(`/lead/${id}`, data)
  }

  delete(id: any) {
    return http.delete(`/lead/${id}`)
  }

  deleteAll() {
    return http.delete(`/lead`)
  }

  findByTitle(title: any) {
    return http.get(`/lead?title=${title}`)
  }
}
