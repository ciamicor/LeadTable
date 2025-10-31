<template>
  <button v-if="sessionStore.logged_In === true"
          class="--float --top-r --warn--invert"
          @click="logOut">
    Sign Out
  </button>

  <div
    v-else
    class="row --place-content-center --place-items-center">
    <div
      class="--p-v-20 col-12-300 col-10-500 col-6-900">
      <h4 class="--m-0">{{ expoLocal.expo_Client }} {{ expoLocal.expo_Year }} Supplier's
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
             v-model="companyLocal.id"
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
  <router-link
    v-if="sessionStore.logged_In === false"
    class="--place-self-center --m-b-12"
    to="/">Looking for a different Supplier's Day?
  </router-link>

  <div v-if="debug"
       class="row">
    <div class="col-12">
      <span>{{ sessionStore }}</span>
      <h2>companyData</h2>
      {{ companyLocal }}
      <h2>Extras</h2>
      {{ companyExtras }}
    </div>
  </div>

  <iframe
    v-if="sessionStore.logged_In === true"
    :src="'https://app.expofp.com' + companyLocal.login_Url"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>
</template>

<script lang="ts"
        setup>
import {
  getExhibitorDetails,
  getExhibExtras
} from '../services/ExpoFPDataService.ts'
import {
  createCompany_Service,
  getCompanyById_Service,
  updateCompanyLeadRet_Service
} from '@/services/ExhibitorDataService.ts'
import { ref } from 'vue'
import { db } from '@/db.ts'
import { useCompanyLocalStore, useExpoLocalStore, useSessionStore } from '@/stores.ts'
import router from "@/router.ts";

/*-| Variables
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(false)

const companyExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)

const sessionStore = useSessionStore()
const companyLocal = useCompanyLocalStore()
const expoLocal = useExpoLocalStore()

/*-| Lifecycle |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

/*-| DB |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const status = ref()

/*-| Login/Out |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function login() {
  /*-| Get Exhibitor |-*/
  console.log('Getting Exhibitor...')
  let getCompany
  getCompany = await getCompanyById_Service(companyLocal.id)

  if (!getCompany) {
    console.log('No Company')
    getCompany = await getExhibitorDetails(
      companyLocal.id,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
    )
  }
  console.log("Got exhibitor company:")
  console.log(getCompany.name)

  companyLocal.$patch({
    id: getCompany.id,
    name: getCompany.name,
    login_Url: getCompany.autoLoginUrl,
    lead_Ret: getCompany.lead_Ret || extraMatch.value,
    expo_Year: expoLocal.expo_Year,
    expo_Client: expoLocal.expo_Client,
  })
  console.log(companyLocal)
  // TODO - Check to see if lead retrieval has changed.
  /*-| Check for Lead Retrieval
  ---+----+---+----+---+----+---+----+---*/
  try {
    console.log('Matching extras...')
    companyExtras.value = await getExhibExtras(
      companyLocal.id,
      expoLocal.expo_Client,
      expoLocal.expo_Year
    )
    console.log("Company extras are: ", companyExtras.value)
    /*-| Look for Lead Ret match |-*/
    extraMatch.value = await companyExtras.value.some((e: any) =>
      e.name.toLowerCase().includes('lead retrieval')
    )
    console.log("Lead retrieval purchased: ", extraMatch.value)
  } catch (e) {
    console.log(e)
  }

  /*-| Prep ExpoFP Login |-*/
  // console.log('Logging in for: ', companyLocal.name)
  // console.log('loginURL is: ', companyLocal.login_Url)

  /*-| Save to local DB |-*/
  console.log('Saving company to Local DB...')
  await saveDbLogin()
  await createCompany_Service(companyLocal)
  /*-| Check if Company is in server DB |-*/
  await getCompanyById_Service(companyLocal.id)

  sessionStore.logged_In = true
  // window.location.reload()
  router.push({name: 'Leadtable'})
}

async function saveDbLogin() {
  try {
    const id = await db.profile.add({
      id: 1,
      ex_Id: companyLocal.id || 0,
      name: companyLocal.name,
      login_Url: companyLocal.login_Url,
      lead_Ret: companyLocal.lead_Ret || extraMatch.value,
      expo_Client: expoLocal.expo_Client,
      expo_Year: expoLocal.expo_Year
    })
    status.value = `${companyLocal.name}
          successfully added. Got id ${id}`
  } catch (error) {
    status.value = `Failed to add
          ${companyLocal.name}: ${error}`
  }
}

async function logOut() {
  // db.delete({ disableAutoOpen: false })
  db.profile.delete(1)
  loginIdMatch.value = false
  extraMatch.value = false
  sessionStore.logged_In = false
  companyLocal.$reset()
  window.location.reload()
}
</script>
