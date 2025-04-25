<template>
  <button v-if="loggedIn"
          class="--float --top-r --warn--invert"
          @click="logOut">
    Sign Out
  </button>

  <!--    v-else-->
  <div
    class="row --place-content-center --place-items-center">
    <div
      class="col-12-300 col-10-500 col-6-900">
      <h4 class="--m-0">{{ expoLocalData.expo_Client }} {{ expoLocalData.expo_Year }} Supplier's
                        Day</h4>
      <h1>Exhibitor Login</h1>
      <p>If you've already purchased lead retrieval, login here to access it.</p>
      <p>To purchase lead retrieval, login to your ExpoFP Exhibitor profile here, and add it as a
         booth extra.</p>
      <label
        for="profileUrl">
        Login ID
      </label>
      <input id="loginId"
             v-model="loginId"
             inputmode="tel"
             name="loginId"
             pattern="\d*"
             placeholder="Enter your login ID"
             type="tel">
      <button class="--primary--invert"
              @click="login()">
        Exhibitor Profile Login
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
      <h2>companyData</h2>
      {{ selectedCompanyData }}
      {{ companyLocalData }}
    </div>
  </div>

  <iframe
    v-if="loggedIn"
    :src="'https://app.expofp.com' + loginUrl"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>
</template>

<script lang="ts"
        setup>
import {
  getExhibitor,
  getExhibExtras
} from '../services/ExpoFpDataService.ts'
import {
  createCompany_Service,
  getCompanyById_Service,
  getLocalCompanyData_Service
} from '@/services/CompanyDataService.ts'
import {getExpoToken_Service} from "@/services/ExpoDataService.ts";
import {onMounted, ref} from 'vue'
import {db} from '@/db.ts'
import {useCompanyLocalStore, useExpoLocalStore} from '@/stores.ts'

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(true)

const selectedCompanyData = ref()
const companyExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)

const loginId = ref('')
const loginUrl = ref()
const loggedIn = ref(false)

const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

/*-| Lifecycle |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onMounted(async () => {
    await getProfile()
  }
)

/*-| DB |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const status = ref()

async function getProfile() {
  await getLocalCompanyData_Service(companyLocalData)
  // if (companyLocalData.id !== 0) loginId.value = companyLocalData.id
  loginId.value = 10675008
  loginUrl.value = companyLocalData.login_Url
  console.log('Login URL is: ', loginUrl.value)
  /*if (companyLocalData) {
    loggedIn.value = true
  }*/
}

async function saveDbLogin() {
  try {
    const id = await db.profile.add({
      id: 1,
      ex_Id: selectedCompanyData.value.id,
      name: selectedCompanyData.value.name,
      login_Url: selectedCompanyData.value.autoLoginUrl,
      lead_Ret: !!extraMatch.value,
      expo_Client: expoLocalData.expo_Client,
      expo_Year: expoLocalData.expo_Year
    })
    status.value = `${selectedCompanyData.value.name}
          successfully added. Got id ${id}`
  } catch (error) {
    status.value = `Failed to add
          ${selectedCompanyData.value.name}: ${error}`
  }
}

/*-| Login/Out |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function login() {
  /*-| Get Exhibitor |-*/
  console.log('Getting Exhibitor...')
  await getExhibitor(
    loginId.value,
    expoLocalData.expo_Client,
    expoLocalData.expo_Year,
    selectedCompanyData)

  /*-| Match Extras |-*/
  console.log('Matching extras...')
  await getExhibExtras(
    loginId.value,
    expoLocalData.expo_Client,
    expoLocalData.expo_Year,
    companyExtras)

  /*-| Check Extras |-*/
  /*console.log("Extras: ", companyExtras.value)
  extraMatch.value = companyExtras.value.some((e: any) =>
    e.name.toLowerCase().includes('lead retrieval')
  )
  console.log("Lead retrieval purchased: ", extraMatch.value)*/
  console.log('Logging in for: ', selectedCompanyData.value.name)
  loginUrl.value = selectedCompanyData.value.autoLoginUrl
  console.log('loginURL is: ', loginUrl.value)

  console.log('Saving company to Local DB...')
  await saveDbLogin()
  await createCompany_Service(selectedCompanyData, companyLocalData.expo_Year, companyLocalData.expo_Client)
  /*-| Check if Company is in server DB |-*/
  await getCompanyById_Service(loginId.value)

  loggedIn.value = true
  // window.location.reload()
}

async function logOut() {
  // db.delete({ disableAutoOpen: false })
  db.profile.delete(1)
  loginIdMatch.value = false
  extraMatch.value = false
  loggedIn.value = false
  companyLocalData.$reset()
  window.location.reload()
}
</script>
