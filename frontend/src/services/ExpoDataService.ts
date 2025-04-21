import http from '../http-common'

class ExpoDataService {
  create(data: any) {
    return http.post('/expo', data)
  }

  getAll() {
    return http.get('/expo')
  }

  getExpo(client: string, year: any) {
    return http.get('/expo/client/' + client + '/year/' + year)
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

/*-| Get by Client, Year |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getExpo_Service(client: any, year: any, expoObject: any) {
  await expoService.getExpo(client, year)
    .then((response) => {
      // console.log("Found Expo: ", response.data)
      expoObject.active = response.data.active
      expoObject.start_Date = response.data.start_Date
      expoObject.expo_Client = response.data.expo_Client
      expoObject.year = response.data.year
      expoObject.expoFp_Id = response.data.expoFp_Id
      expoObject.logoUrl_Color = response.data.logoUrl_Color
      expoObject.logoUrl_Black = response.data.logoUrl_Black
      expoObject.expoFp_MapUrl = response.data.expoFp_MapUrl

      //expoObject.value = response.data
      // console.log('expo: ', expoObject.value)
    })
    .catch((e) => {
      console.log(e)
    })
}

export {getExpo_Service, createExpo_Service, getAllExpos_Service}
