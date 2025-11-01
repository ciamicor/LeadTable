<template>
  <div v-if="sessionStore.logged_In === true"
       class="container --align-content-start --p-6">
    <div>
      <div class="row-12-300">
        <a :href="`https://app.expofp.com${companyLocalData.login_Url}`"
           class="button"
           target="_blank">
          ExpoFP Profile
          <i class="--m-l-4 bi-arrow-up-right-square"></i>
        </a>
        <ButtonSignOut
          :extra-match="extraMatch"
          :login-id-match="loginIdMatch"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="row --place-content-center --place-items-center">
    <div
      class="col-12-300 col-10-500 col-6-900 --p-24-clamp">
      <h4 class="--m-0">
        {{ expoLocalData.expo_Client }} {{ expoLocalData.expo_Year }} Supplier's Day
      </h4>
      <h1>Exhibitor Login</h1>
      <p>If you've already purchased lead retrieval, login here to access it.</p>
      <p v-if="!expoLocalData.expoInPast">
        To purchase lead retrieval, login to your ExpoFP Exhibitor profile here, and add it as a
        booth extra.</p>
      <label
        for="profileUrl">
        Login ID
      </label>
      <p>12620281</p>
      <input id="loginId"
             v-model="companyLocalData.id"
             inputmode="tel"
             name="loginId"
             pattern="\d*"
             placeholder="Enter your login ID"
             type="tel"
             @keydown.enter="login">
      <button class="--primary--invert"
              @click="login()">
        Login
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
  <div
    v-if="sessionStore.logged_In === true && expoLocalData.expoInPast === true"
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
} from '@/services/ExpoFpDataService.ts'
import {
  createCompany_Service,
  getCompanyById_Service,
} from '@/services/CompanyDataService.ts'
import {
  useCompanyLocalStore,
  useExpoLocalStore,
  useSessionStore
} from '@/stores.ts'
import { type Ref, ref } from 'vue'
import { useRouter } from "vue-router";
import { saveLogin_LocalDB } from "@/services/functions/LoginLogoutFunc.ts";
import ButtonSignOut from '../Button_SignOut.vue'
import { object } from "better-auth";

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(true)
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

  console.log("Expo in past:" + expoLocalData.expoInPast)

  /*-| If Expo has passed, only check the database. |-*/
  if (expoLocalData.expoInPast) {
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
  }
  /*-| If Expo is not over, check ExpoFP for info. |-*/
  else if (!expoLocalData.expoInPast) {
    console.log('Getting Company...')
    const exhibFP = await getFpExhibitor(
      companyLocalData.id,
      expoLocalData.expo_Client,
      expoLocalData.expo_Year,
    )
    console.log("Got exhibitor company from ExpoFP: ", exhibFP)

    companyLocalData.$patch({
      id: exhibFP.id,
      name: exhibFP.name,
      login_Url: exhibFP.autoLoginUrl,
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
    await saveLogin_LocalDB(
      companyLocalData.id,
      companyLocalData.name,
      companyLocalData.login_Url,
      extraMatch.value,
      expoLocalData.expo_Client,
      expoLocalData.expo_Year,
      status
    )
    await createCompany_Service({
      id: 56,
      expoId: 999,
      name: "TEST",
      login_Url: "NO",
      lead_Ret: 1,
      expo_Year: 2025,
      expo_Client: "TEST",
    })
    await createCompany_Service(companyLocalData)
    console.log("GETTING DEBUG")
    await getCompanyById_Service(12620281)
  }
  sessionStore.logged_In = true
  /*if (companyLocalData.lead_Ret) {
    await router.push({name: 'Lead Table'})
  }*/
}

async function scanUpdates(id: number) {
  console.log(exhibFP.updatedAt)
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
