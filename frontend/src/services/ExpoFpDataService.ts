import axios from 'axios'

const baseUrl = 'https://app.expofp.com/api/v1/'
const fpToken = '12593l56be89a73a1d79031b6f6fd7fdc621adc60ee8d52fb2211a2a2891ed8948ae46'

/*-| Get All Exhibitors |-*/
/*---+----+---+----+---+----+---+----+---*/
export const getAllExhibitors = () => axios({
  method: 'post',
  url: baseUrl + 'list-exhibitors',
  data: {
    'token': fpToken,
    'eventId': 23706
  }
})
  .then((res) => {
    // console.log("all exhibitors response: ", res.data)
    return res.data
  })

/*-| Get Exhibitor |-*/
/*---+----+---+----+---+----+---+----+---*/
export const getExhibitor = (id: any) => axios({
  method: 'post',
  url: baseUrl + 'get-exhibitor',
  data: {
    'token': fpToken,
    'id': id
  }
})
  .then((res) => {
    // console.log("exhibitor response: ", res.data)
    return res.data
  })

/*-| Get Exhibitor Extras |-*/
/*---+----+---+----+---+----+---+----+---*/
export const getExhibExtras = (id: any) => axios({
  method: 'post',
  url: baseUrl + 'list-exhibitor-extras',
  data: {
    'token': fpToken,
    'exhibitorId': id
  }
})
  .then((res) => {
    // console.log("extras response: ", res.data)
    return res.data
  })

// These don't work as well as 'export const', but they get to stay here
/*
export default ExpoFpDataService {
  getAllExhibitors(i: any) {
    axios({
      method: 'post',
      url: baseUrl + 'list-exhibitors',
      data: {
        "token": fpToken,
        "eventId": 23706
      }
    })
      .then((res) => {
        console.log("all exhibitors response: ", res.data)
        i.value = res.data
      })
  }

  getExhibitor(id: any, exData: any) {
    axios({
      method: 'post',
      url: baseUrl + 'get-exhibitor',
      data: {
        "token": fpToken,
        "id": id
      }
    })
      .then((res) => {
        console.log("exhibitor response: ", res.data)
        exData.value = res.data
      })
  }

  getExhibitorExtras(id: any, extraData: any) {
    axios({
      method: 'post',
      url: baseUrl + 'list-exhibitor-extras',
      data: {
        "token": fpToken,
        "exhibitorId": id
      }
    })
      .then((res) => {
        console.log("extras response: ", res.data)
        extraData.value = res.data
      })
  }

}*/
