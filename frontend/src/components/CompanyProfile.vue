<template>
  <button v-if="loggedIn"
          class="--float --top-r --warn"
          @click="logOut">
    Sign Out
  </button>

  <iframe
    v-if="loggedIn"
    :src="'https://app.expofp.com' + loginUrl"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>
  <div v-else
       class="row --place-content-center --place-items-center">
    <div
      class="col-10-300 col-7-700">
      <h1>Company Login</h1>
      <p>If you've already purchased lead retrieval, login here to access it.</p>
      <p>To purchase lead retrieval, login to your ExpoFP Exhibitor profile here, and add it as a
         booth extra.</p>
      <label
        for="profileUrl">
        Login ID
      </label>
      <input id="loginId"
             v-model="loginId"
             name="loginId"
             placeholder="Enter your login ID"
             type="text">
      <button class="--success"
              @click="login()">
        Exhibitor Portal Login
      </button>
    </div>
  </div>

  <div v-if="debug"
       class="row">
    <p>{{ selectedCompanyData ? selectedCompanyData.id : null }}</p>
    <p>{{ loginUrl }}</p>
    <div class="col-12">
      <div class="row">
        <p class="col-5">Link match: {{ loginIdMatch }}</p>
        <p class="col-5">Lead retrieval: {{ extraMatch }}</p>
      </div>
      <h2>Login Id</h2>
      <p>{{ loginId }}</p>
      <p>{{ selectedCompanyData ? selectedCompanyData.id : null }}</p>
      <h2>Extras</h2>
      {{ companyExtras }}
      <h2>exData</h2>
      {{ selectedCompanyData }}
    </div>
    {{ companyLocalData }}
  </div>
</template>

<script lang="ts"
        setup>
import {
  getAllExhibitors,
  getExhibitor,
  getExhibExtras
} from '../services/ExpoFpDataService.ts'
import { createCompany_Service, getProfile_Service } from '@/services/CompanyDataService.ts'
import { onBeforeMount, ref } from 'vue'
import { db } from '@/db.ts'
import { companyLocalStore } from '@/main.ts'

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(false)

const exList = ref()

const selectedCompanyData = ref()
const companyExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)
const expoYear = ref()

const loginId = ref('')
const loginUrl = ref('')
const loggedIn = ref(false)

const companyLocalData = companyLocalStore()

/*-| Lifecycle |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onBeforeMount(() => {
    getProfile()
    getAllEx()
  }
)

/*-| DB |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const status = ref()

async function getProfile() {
  await getProfile_Service(companyLocalData)

  loginId.value = companyLocalData.ex_Id
  loginUrl.value = companyLocalData.login_Url

  console.log('profile loginUrl: ', loginUrl.value)

  if (companyLocalData) {
    loggedIn.value = true
  }
}

/*async function getProfile() {
  let companyLocalHold: any = await db.profile.get(1)
  console.log('company local hold ', companyLocalHold)

  companyLocalData.ex_Id = companyLocalHold.ex_Id
  companyLocalData.name = companyLocalHold.name
  companyLocalData.login_Url = companyLocalHold.login_Url
  companyLocalData.lead_Ret = companyLocalHold.lead_Ret
  companyLocalData.expo_Year = companyLocalHold.expo_Year

  console.log('ex_Id: ', companyLocalData.ex_Id)
  console.log('name: ', companyLocalData.name)
  console.log('login_Url: ', companyLocalData.login_Url)
  console.log('lead_Ret: ', companyLocalData.lead_Ret)
  console.log('expo_Year: ', companyLocalData.expo_Year)

  loginId.value = companyLocalData.ex_Id
  loginUrl.value = companyLocalData.login_Url

  console.log('profile loginUrl: ', loginUrl.value)

  if (companyLocalData) {
    loggedIn.value = true
  }
}*/

async function saveDbLogin() {
  try {
    const id = await db.profile.add({
      ex_Id: selectedCompanyData.value.id,
      name: selectedCompanyData.value.name,
      login_Url: selectedCompanyData.value.autoLoginUrl,
      lead_Ret: !!extraMatch.value,
      expo_Year: expoYear.value
    })
    status.value = `${selectedCompanyData.value.name}
          successfully added. Got id ${id}`
  } catch (error) {
    status.value = `Failed to add
          ${selectedCompanyData.value.name}: ${error}`
  }
}

/*-| Function |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
function matchUrlParams(u: string) {
  return u.match(/(\?uid)(.*)(&token)/g)
}

async function getAllEx() {
  const hold = await getAllExhibitors()
  exList.value = hold.filter((c: any) => {
    return c.booths.length > 0
  })
  // console.log('exList: ', exList.value)
}

async function getEx(id: any) {
  selectedCompanyData.value = await getExhibitor(id)
  console.log('exData: ', selectedCompanyData.value)
}

async function getExtras(id: any) {
  companyExtras.value = await getExhibExtras(id)
  console.log('Extras: ', companyExtras.value)
}

async function checkLeadExtra(id: any) {
  console.log('checking lead retrieval purchase')
  await getExtras(id)
  extraMatch.value = await companyExtras.value.some((e: any) =>
    e.name.toLowerCase().includes('lead retrieval')
  )
  if (extraMatch.value) {
    alert(selectedCompanyData.value.name + ': Lead Retrieval purchased')
  } else if (!extraMatch.value) {
    alert(selectedCompanyData.value.name + ' has not purchased Lead Retrieval.')
  }
  console.log('lead retrieval purchased: ', extraMatch.value)
}

async function login() {
  await getEx(loginId.value)
  await checkLeadExtra(loginId.value)
  console.log('company logging in is: ', selectedCompanyData.value.autoLoginUrl)
  loginUrl.value = selectedCompanyData.value.autoLoginUrl
  console.log('loginURL: ', loginUrl.value)

  expoYear.value = parseInt(selectedCompanyData.value.updatedAt.slice(0, 4))
  await saveDbLogin()
  await createCompany_Service(selectedCompanyData, expoYear.value)
  loggedIn.value = true

  // window.location.reload()
}

async function logOut() {
  db.delete({ disableAutoOpen: false })
  loginIdMatch.value = false
  extraMatch.value = false
  loggedIn.value = false
  companyLocalData.$reset()
  window.location.reload()
}
</script>
