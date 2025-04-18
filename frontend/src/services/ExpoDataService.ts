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

/*-| Get All Expos |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getAllExpos_Service(exposList: any) {
  await expoService.getAll()
    .then((response) => {
      exposList.value = response.data
      // console.log(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

/*-| Create |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createExpo_Service(expoObject: any) {
  console.log(expoObject.value)
  const data = {
    active: expoObject.active,
    start_Date: expoObject.start_Date,
    expo_Client: expoObject.expo_Client,
    year: expoObject.year,
    expoFp_Id: expoObject.expoFp_Id,
    logoUrl_Color: expoObject.logoUrl_Color,
    logoUrl_Black: expoObject.logoUrl_Black,
    expoFp_MapUrl: expoObject.expoFp_MapUrl
  }
  console.log(data)
  await expoService.create(data)
    .then((response: any) => {
      expoObject.id = response.data.id
      console.log(response.data)
      expoObject = null
    })
    .catch((e: any) => {
      console.log(e)
    })
}

/*-| Get by ID |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getExpoById_Service(id: any, expoObject: any) {
  await expoService.get(id)
    .then((response) => {
      expoObject.value = response.data
      // console.log('expo: ', expoObject.value)
    })
    .catch((e) => {
      console.log(e)
    })
}

export {getExpoById_Service, createExpo_Service, getAllExpos_Service}
