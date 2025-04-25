import axios from 'axios'
import {getExpoToken_Service} from "@/services/ExpoDataService.ts";

const baseUrl = 'https://app.expofp.com/api/v1/'

/*-| Get All Exhibitors |-*/

/*---+----+---+----+---+----+---+----+---*/
export async function getAllExhibitors(client: any, year: any) {
  try {
    let token = await getExpoToken_Service(client, year)
    // await console.log('getAllExhibitors got token: ', token)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'list-exhibitors',
      data: {
        'token': token,
        'eventId': 23706
      }
    })
    console.log("Got all Exhibitors: ", res.data)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Exhibitor |-*/

/*---+----+---+----+---+----+---+----+---*/
export async function getExhibitor(
  id: any,
  client: any,
  year: any) {
  try {
    let token = await getExpoToken_Service(client, year)
    // console.log('getExhibitor got token: ',)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'get-exhibitor',
      data: {
        'token': token,
        'id': id
      }
    })
    // console.log("Got Exhibitor: ", res.data)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Exhibitor Extras |-*/

/*---+----+---+----+---+----+---+----+---*/
export async function getExhibExtras(
  id: any,
  client: any,
  year: any,
) {
  try {
    let token = await getExpoToken_Service(client, year)
    // console.log('getExhibitor got token: ',)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'list-exhibitor-extras',
      data: {
        'token': token,
        'exhibitorId': id
      }
    })
    // console.log("Exhibitor extras are: ", res.data)
    return res.data
  } catch (e) {
    console.log(e);
  }

}


