<template>
  <div>{{ expoLocalData.expoInPast }}</div>
  <button-sign-out
    v-if="sessionStore.logged_In === true"
    :extra-match="extraMatch"
    :login-id-match="loginIdMatch"
  />

  <div
    v-else
    class="row --place-content-center --place-items-center">
    <div
      class="--p-v-20 col-12-300 col-10-500 col-6-900">
      <h4 class="--m-0">{{ expoLocalData.expo_Client }} {{ expoLocalData.expo_Year }} Supplier's
                        Day</h4>
      <h1>Exhibitor Login</h1>
      <p>If you've already purchased lead retrieval, login here to access it.</p>
      <p v-if="!expoLocalData.expoInPast">
        To purchase lead retrieval, login to your ExpoFP Exhibitor profile here, and add it as a
        booth extra.</p>
      <label
        for="profileUrl">
        Login ID
      </label>
      <input id="loginId"
             v-model="companyLocalData.id"
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
      {{ companyLocalData }}
      <h2>Extras</h2>
      {{ companyExtras }}
    </div>
  </div>

  <iframe
    v-if="sessionStore.logged_In === true && expoLocalData.expoInPast === false"
    :src="'https://app.expofp.com' + companyLocalData.login_Url"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>

  <div
    v-else-if="sessionStore.logged_In === true && expoLocalData.expoInPast === true"
    class="row"
  >
    <div class="col-10-300 col-8-800">
      <h3>This expo has passed.</h3>
      <p>After the expo you are unable to view your ExpoFP profile, but your leads are always
         accessible. </p>
      <router-link
        class="button --success--invert"
        to="leads-list">View Leads
      </router-link>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import {
  getFpExhibitor,
  getFpExhibExtras
} from '../services/ExpoFpDataService.ts'
import {
  createCompany_Service,
  getCompanyById_Service,
  updateCompanyLeadRet_Service
} from '@/services/CompanyDataService.ts'
import {
  useCompanyLocalStore,
  useExpoLocalStore,
  useSessionStore
} from '@/stores.ts'
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {saveLogin_LocalDB} from "@/services/functions/LoginLogout.ts";
import ButtonSignOut from './Button_SignOut.vue'

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(false)

const router = useRouter()

const companyExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

const status = ref()

/*-| Login/Out |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function login() {
  /*-| Check if Company is in server DB |-*/
  const serverExhib = await getCompanyById_Service(companyLocalData.id)

  /*-| If exists, get Exhibitor from Server DB
  ---+----+---+----+---+----+---+----+---*/
  if (serverExhib) {
    companyLocalData.$patch({
      id: serverExhib.id,
      name: serverExhib.name,
      login_Url: serverExhib.login_URL,
      lead_Ret: serverExhib.lead_Ret,
      expo_Year: serverExhib.expo_Year,
      expo_Client: serverExhib.expo_Client,
    })
    await saveLogin_LocalDB(
      companyLocalData.id,
      companyLocalData.name,
      companyLocalData.login_Url,
      serverExhib.lead_Ret,
      expoLocalData.expo_Client,
      expoLocalData.expo_Year,
      status
    )
  } else {
    console.log("Didn't find that company. Check your company ID to make sure it exists.")
    /*-| If not in Server DB, Get Exhibitor from ExpoFP
    ---+----+---+----+---+----+---+----+---*/
    console.log('Getting Exhibitor...')
    let gotExhib = await getFpExhibitor(
      companyLocalData.id,
      expoLocalData.expo_Client,
      expoLocalData.expo_Year,
    )
    console.log("Got exhibitor company from ExpoFP: ", gotExhib)

    companyLocalData.$patch({
      id: gotExhib.id,
      name: gotExhib.name,
      login_Url: gotExhib.autoLoginUrl,
      lead_Ret: extraMatch.value,
      expo_Year: expoLocalData.expo_Year,
      expo_Client: expoLocalData.expo_Client,
    })

    /*-| Check for Lead Retrieval |-*/
    /*---+----+---+----+---+----+---+----+---*/
    await checkLeadRetPurch()

    /*-| Prep ExpoFP Login |-*/
    console.log('Logging in for: ', companyLocalData.name)
    console.log('loginURL is: ', companyLocalData.login_Url)

    /*-| Save to local DB |-*/
    console.log('Saving company to Local DB...')
    // await saveDbLogin()
    await saveLogin_LocalDB(
      companyLocalData.id,
      companyLocalData.name,
      companyLocalData.login_Url,
      extraMatch.value,
      expoLocalData.expo_Client,
      expoLocalData.expo_Year,
      status
    )
    await createCompany_Service(companyLocalData)
  }
  sessionStore.logged_In = true

  if (companyLocalData.lead_Ret) {
    await router.push({name: 'LeadsList'})
  }
}

// TODO add function that compares ExpoFP & DB results
// Updates data where appropriate (loginURL, etc)
// Should not update lead retrieval after expo date has passed.

async function checkLeadRetPurch() {
  console.log('Matching extras...')
  companyExtras.value = await getFpExhibExtras(
    companyLocalData.id,
    expoLocalData.expo_Client,
    expoLocalData.expo_Year)
  console.log("Company extras are: ", companyExtras.value)
  /*-| Look for Lead Ret match |-*/
  extraMatch.value = await companyExtras.value.some((e: any) =>
    e.name.toLowerCase().includes('lead retrieval')
  )
  console.log("Lead retrieval purchased: ", extraMatch.value)
}

</script>
