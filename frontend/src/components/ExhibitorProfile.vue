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
      <h4 class="--m-0">{{ expoLocal.expo_Client }} {{ expoLocal.expo_Year }} Supplier's Day</h4>
      <h1>Exhibitor Login</h1>
      <p>If you've already purchased lead retrieval, login here to access it.</p>
      <p>To purchase lead retrieval, login to your ExpoFP Exhibitor profile here, and add it as a
         booth extra.</p>
      <label
        for="profileUrl">
        Login ID
      </label>
      <input id="loginId"
             v-model="exhibitorLocal.id"
             inputmode="tel"
             name="loginId"
             pattern="\d*"
             placeholder="Enter your login ID"
             type="tel"
             @keydown.enter="login()"
      >
      <button class="--primary--invert"
              @click="login()">
        Exhibitor Profile Login
      </button>
    </div>
  </div>
  <!--  <router-link
      v-if="sessionStore.logged_In === false"
      class="&#45;&#45;place-self-center &#45;&#45;m-b-12"
      to="/">Looking for a different Supplier's Day?
    </router-link>-->

  <div v-if="debug"
       class="row">
    <div class="col-12">
      <span>{{ sessionStore }}</span>
      <h2>companyData</h2>
      {{ exhibitorLocal }}
      <h2>Extras</h2>
      {{ exhibitorExtras }}
    </div>
  </div>

  <iframe
    v-if="sessionStore.logged_In === true"
    :src="'https://app.expofp.com' + exhibitorLocal.login_Url"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>
</template>

<script lang="ts"
        setup>
import {
  getFPExhibitor,
  getFPExhibitorExtras
} from '../services/ExpoFPDataService.ts'
import {
  createExhibitor_Service,
  getExhibitor_Service,
  updateExhibitor_Service
} from '@/services/ExhibitorDataService.ts'
import { ref } from 'vue'
import { db } from '@/db.ts'
import { useExhibitorLocalStore, useExpoLocalStore, useSessionStore } from '@/stores.ts'
import router from "@/router.ts";

/*-| Variables
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(false)

const exhibitorExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)

const sessionStore = useSessionStore()
const exhibitorLocal = useExhibitorLocalStore()
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
  getCompany = await getExhibitor_Service(exhibitorLocal.id)

  if (!getCompany) {
    console.log('No Company')
    getCompany = await getFPExhibitor(
      exhibitorLocal.id,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
    )
  }
  console.log("Got exhibitor company:")
  console.log(getCompany)

  exhibitorLocal.$patch({
    id: getCompany.id,
    name: getCompany.name,
    login_Url: getCompany.autoLoginUrl || getCompany.login_Url,
    lead_Ret: getCompany.lead_Ret || extraMatch.value,
    expo_Year: expoLocal.expo_Year,
    expo_Client: expoLocal.expo_Client,
  })
  console.log(exhibitorLocal)
  // TODO - Check to see if lead retrieval has changed.
  /*-| Check for Lead Retrieval
  ---+----+---+----+---+----+---+----+---*/
  try {
    console.log('Matching extras...')
    exhibitorExtras.value = await getFPExhibitorExtras(
      exhibitorLocal.id,
      expoLocal.expo_Client,
      expoLocal.expo_Year
    )
    console.log("Company extras are: ", exhibitorExtras.value)
    /*-| Look for Lead Ret match |-*/
    extraMatch.value = await exhibitorExtras.value.some((e: any) =>
      e.name.toLowerCase().includes('lead retrieval')
    )
    console.log("Lead retrieval purchased: ", extraMatch.value)
  } catch (e) {
    console.log(e)
  }

  /*-| Prep ExpoFP Login |-*/
  // console.log('Logging in for: ', companyLocal.name)
  // console.log('loginUrl is: ', companyLocal.login_Url)

  /*-| Save to local DB |-*/
  console.log('Saving company to Local DB...')
  await saveDbLogin()
  await createExhibitor_Service(exhibitorLocal)
  /*-| Check if Company is in server DB |-*/
  await getExhibitor_Service(exhibitorLocal.id)

  sessionStore.logged_In = true
  // window.location.reload()
  router.push({name: 'Leadtable'})
}

async function saveDbLogin() {
  try {
    const id = await db.profile.add({
      id: 1,
      ex_Id: exhibitorLocal.id || 0,
      name: exhibitorLocal.name,
      login_Url: exhibitorLocal.login_Url,
      lead_Ret: exhibitorLocal.lead_Ret || extraMatch.value,
      expo_Client: expoLocal.expo_Client,
      expo_Year: expoLocal.expo_Year
    })
    status.value = `${exhibitorLocal.name}
          successfully added. Got id ${id}`
  } catch (error) {
    status.value = `Failed to add
          ${exhibitorLocal.name}: ${error}`
  }
}

async function logOut() {
  // db.delete({ disableAutoOpen: false })
  db.profile.delete(1)
  loginIdMatch.value = false
  extraMatch.value = false
  sessionStore.logged_In = false
  exhibitorLocal.$reset()
  window.location.reload()
}
</script>
