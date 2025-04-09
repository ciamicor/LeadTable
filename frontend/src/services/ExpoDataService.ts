import http from '../http-common'

export default class ExpoDataService {
  create(data: any) {
    return http.post('/expo', data)
  }

  getAll() {
    return http.get('/expo')
  }

  get(id: any) {
    return http.get('/expo/' + id)
  }
}

/*-| Functions |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const expoService = new ExpoDataService()

/*-| Get by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getExpo_Service(id: any, expoObject: any) {
  await expoService.get(id)
    .then((response) => {
      expoObject.value = response.data
      console.log('company: ', expoObject)
    })
    .catch((e) => {
      console.log(e)
    })
}

export { getExpo_Service }
