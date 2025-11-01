import axios from 'axios'
import { getExpoToken_Service } from "@/services/ExpoDataService.ts";

const baseUrl = 'https://app.expofp.com/api/v1/'

/*-| Get All Exhibitors
---+----+---+----+---+----+---+----+---*/
export async function getAllExhibitors(client: any, year: any) {
  try {
    const getData: any = await getExpoToken_Service(client, year)
    let expoData: { expoId: number, token: string } = {
      expoId: getData.expoId,
      token: getData.token
    }
    // await console.log('getAllExhibitors got token: ', token)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'list-exhibitors',
      data: {
        'token': expoData.token,
        'eventId': 23706
      }
    })
    console.log("Got all Exhibitors: ", res.data)
    expoData.token = ""
    return res.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Exhibitor ID
---+----+---+----+---+----+---+----+---*/
export async function getExhibitorId(
  externalId: any,
  client: any,
  year: any) {
  try {
    const getData: any = await getExpoToken_Service(client, year)
    let expoData: { expoId: number, token: string } = {
      expoId: getData.expoId,
      token: getData.token
    }
    console.log(`Getting id for externalId: ${externalId}`)
    console.log(expoData)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'get-exhibitor-id',
      data: {
        'eventId': expoData.expoId,
        'externalId': externalId,
        'token': expoData.token,
      }
    })
    console.log("Got Exhibitor: ", res.data)
    expoData.token = ""
    return res.data.id
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Exhibitor Details
---+----+---+----+---+----+---+----+---*/
export async function getExhibitorDetails(
  id: any,
  client: any,
  year: any) {
  try {
    const getData: any = await getExpoToken_Service(client, year)
    let expoData: { expoId: number, token: string } = {
      expoId: getData.expoId,
      token: getData.token
    }
    // console.log('getExhibitor got token: ',)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'get-exhibitor',
      data: {
        'token': expoData.token,
        'id': id
      }
    })
    console.log("Got Exhibitor: ", res.data)
    expoData.token = ""
    return res.data
  } catch (e) {
    console.log(e)
  }
}

/*-| Get Exhibitor Extras
---+----+---+----+---+----+---+----+---*/
export async function getExhibExtras(
  id: any,
  client: any,
  year: any,
) {
  try {
    const getData: any = await getExpoToken_Service(client, year)
    let expoData: { expoId: number, token: string } = {
      expoId: getData.expoId,
      token: getData.token
    }
    // console.log('getExhibitor got token: ',)
    let res = await axios({
      method: 'post',
      url: baseUrl + 'list-exhibitor-extras',
      data: {
        'token': expoData.token,
        'exhibitorId': id
      }
    })
    // console.log("Exhibitor extras are: ", res.addresses)
    expoData.token = ""
    return res.data
  } catch (e) {
    console.log(e);
  }

}

/*-| Add Exhibitor
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
export async function addExhibitor(
  client: any,
  year: any,
  exhibitor: any
) {
  /*-| Check if exists in ExpoFP already
  ---+----+---+----+---+----+---+----+---*/
  console.log("Exhibitor is:")
  console.log(exhibitor)
  // TODO getExhibitorId runs more times than necessary
  const existsId = await getExhibitorId(
    exhibitor.externalId,
    exhibitor.expo_Client,
    exhibitor.expo_Year
  )
  // getExhibitorId returns a number
  if (typeof existsId === 'number') {
    console.log(`Exhibitor ${existsId} already exists. Moving on.`)
    return "Exhibitor already exists."
  }
  else if (typeof existsId !== 'number') {
    console.log("Exhibitor doesn't exist yet. I'll create that now.")
    try {
      const getData: any = await getExpoToken_Service(client, year)
      let expoData: { expoId: number, token: string } = {
        expoId: getData.expoId,
        token: getData.token
      }
      // console.log('getExhibitor got token: ',)
      let res = await axios({
        method: 'post',
        url: baseUrl + 'add-exhibitor',
        data: {
          'token': expoData.token,
          'eventId': expoData.expoId,
          'name': exhibitor.name,
          'description': exhibitor.description,
          'country': exhibitor.country,
          'address': exhibitor.address,
          'address2': exhibitor.address2,
          'city': exhibitor.city,
          'state': exhibitor.state,
          'zip': exhibitor.zip,
          'phone1': exhibitor.phone1,
          'publicEmail': exhibitor.publicEmail,
          'privateEmail': exhibitor.privateEmail,
          'website': exhibitor.website,
          'contactName': exhibitor.contactName,
          'contactPhone': exhibitor.contactPhone,
          'externalId': exhibitor.externalId,
        }
      })
      console.log("Added exhibitor: ", exhibitor.name)
      console.log(exhibitor)
      // expoData.token = ""
      return "Exhibitor created!"
    } catch (e) {
      console.log(`Error! ${e}`)
    }
  }
}

// TODO isolate get token function, so that it only runs once
//  when calling multiple API calls.

/*-| Add Exhibitor Booth
---+----+---+----+---+----+---+----+---*/
export async function addExhibitorBooth(
  client: any,
  year: any,
  exhibitorId: any,
  boothName: string
) {
  try {
    const getData: any = await getExpoToken_Service(client, year)
    let expoData: { expoId: number, token: string } = {
      expoId: getData.expoId,
      token: getData.token
    }
    // console.log('getExhibitor got token: ',)
    await axios({
      method: 'post',
      url: baseUrl + 'add-exhibitor-booth',
      data: {
        'eventId': expoData.expoId,
        'boothName': boothName,
        'exhibitorId': exhibitorId,
        'token': expoData.token,
      }
    })
    console.log("Added booth: ", boothName)
    // expoData.token = ""
    // return res.data
  } catch (e) {
    console.log(`Error! ${e}`)
  }
}


