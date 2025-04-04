import http from '../http-common'

export default class AttendeeDataService {
  create(data: any) {
    return http.post("/attendee", data)
  }

  getAll() {
    return http.get("/attendee")
  }

  get(id: any) {
    return http.get("/attendee/" + id)
  }

  update(id: any, data: any) {
    return http.put("/attendee/" + id, data)
  }

  delete(id: any) {
    return http.delete("/attendee/" + id)
  }
}
