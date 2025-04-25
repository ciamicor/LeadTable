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
  let expos = await expoService.getAll()
  try {
    exposList.value = expos.data
    // console.log(response.data)
  } catch (e) {
    console.log(e)
  }
}

/*-| Create |-*/

/*---+----+---+----+---+----+---+----+---*/
async function createExpo_Service(expoObject: any) {
  const data = {
    active: expoObject.active,
    start_Date: expoObject.start_Date,
    expo_Client: expoObject.expo_Client,
    expo_Year: expoObject.expo_Year,
    expoFp_Id: expoObject.expoFp_Id,
    expoFp_MapUrl: expoObject.expoFp_MapUrl,
    logoUrl_Color: expoObject.logoUrl_Color,
    logoUrl_Black: expoObject.logoUrl_Black,
  }
  console.log('Creating expo with data: ', data)
  let newExpo = await expoService.create(data)
  try {
    expoObject.id = newExpo.data.id
    console.log('Expo created with data: ', newExpo.data)
    expoObject = null
  } catch (e: any) {
    console.log(e)
  }
}

/*-| Get by Client, Year |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getExpo_Service(client: any, year: any, expoObject: any) {
  let e = await expoService.getExpo(client, year)
  try {
    // console.log("Found Expo: ", response.data)
    expoObject.active = e.data.active
    expoObject.start_Date = e.data.start_Date
    expoObject.expo_Client = e.data.expo_Client
    expoObject.expo_Year = e.data.expo_Year
    expoObject.expoFp_Id = e.data.expoFp_Id
    expoObject.expoFp_MapUrl = e.data.expoFp_MapUrl
    expoObject.logoUrl_Color = e.data.logoUrl_Color
    expoObject.logoUrl_Black = e.data.logoUrl_Black

    //expoObject.value = response.data
    // console.log('expo: ', expoObject.value)
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Expo Token |-*/

/*---+----+---+----+---+----+---+----+---*/
async function getExpoToken_Service(client: any, year: any, token: any = 0) {
  // console.log('Getting expo: ', client, year, token.value)
  try {
    let t = await expoService.getExpo(client, year)
    console.log('Expo token ', t.data.expoFp_Token)
    return t.data.expoFp_Token
  } catch (e) {
    console.log(e)
  } finally {
    console.log("Finished getting token.")
  }
}

export {getExpo_Service, getExpoToken_Service, createExpo_Service, getAllExpos_Service}
