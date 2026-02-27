<template>
  <div v-if="sessionStore.logged_In === true"
       class="container --align-content-center --p-6">
    <div class="row-12-300 --w-100 --justify-items-start">
      <p class="--m-b-10 --flex-basis-100">More profile features coming soon.</p>
      <a :href="`https://app.expofp.com${companyStore.login_Url}`"
         class="button"
         target="_blank">
        ExpoFP Profile
        <i class="--m-l-4 bi-arrow-up-right-square"></i>
      </a>
      <a :href="`https://app.expofp.com${companyStore.login_Url.replace('edit?', 'editprofile?')}`"
         class="button"
         target="_blank">
        Edit Profile
        <i class="--m-l-4 bi-arrow-up-right-square"></i>
      </a>
      <ButtonSignOut
        :extra-match="extraMatch"
        :login-id-match="loginIdMatch"
        class="--justify-self-end"
      />
    </div>
  </div>
  <!-- Login -->
  <!-------------------------->
  <div
    v-else
    class="row-12-300 --p-24-clamp --place-content-center --place-items-center">
    <div
      class="--p-v-20 col-12-300 --max-w-400 --flex-grow-1">
      <h4 class="--m-0">
        {{ expoLocal.clientFull }}
        {{ expoLocal.name }}
      </h4>
      <h2>Company Login</h2>
      <form
        class="col-12-300"
        @submit.prevent="login"
      >
        <label>
          Email
          <input id="login-email"
                 v-model="companyStore.emailPrivate"
                 name="login-email"
                 placeholder="Enter your email used to register ExpoFP"
                 required
                 type="email"
          >
        </label>
        <label>
          ExpoFP Exhibitor ID
          <input id="loginId"
                 v-model="companyStore.id"
                 inputmode="tel"
                 name="loginId"
                 pattern="\d*"
                 placeholder="Enter your ID"
                 required
                 type="tel"
                 @keydown.enter="login">
        </label>
        <button class="--primary--invert --m-t-8 --m-b-24 --flex-basis-50"
                type="submit"
                @click="login">
          Login
        </button>
      </form>
    </div>
  </div>

  <div v-if="debug"
       class="row">
    <div class="col-12">
      <span>{{ sessionStore }}</span>
      <h2>companyData</h2>
      {{ companyStore }}
      <h2>Extras</h2>
      {{ exhibitorExtras }}
    </div>
  </div>
  <div
    v-if="sessionStore.logged_In && expoLocal.expoInPast === true"
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

  <iframe
    v-if="sessionStore.logged_In"
    :src="'https://app.expofp.com' + companyStore.login_Url"
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
} from "@/services/ExpoFPDataService.ts"
import {
  createExhibitor_Service,
  getCompany_Service
} from "@/services/ExhibitorDataService.ts"
import { ref } from "vue"
import { saveLogin_LocalDB } from "@/services/LocalDBService.ts";
import ButtonSignOut from "../Button_SignOut.vue"
import { useSessionStore } from "@/stores/session.ts";
import { useEventLocalStore } from "@/stores/event.ts";
import { useCompanyLocalStore } from "@/stores/company.ts";

/*-| Variables
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(true)

const loginId = ref(12603441) // mwscc 2026
const loginEmail = ref("yhouser@ddchemco.com") // mwscc 2026

const exhibitorExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)

const sessionStore = useSessionStore()
const companyStore = useCompanyLocalStore()
const expoLocal = useEventLocalStore()
const status = ref()

/*-| Login/Out |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
// TODO Add URL parameter detection to grab company id...
// TODO... then use that to sign in automatically.
//
// TODO Sync company login with BetterAuth
// TODO Check company login against ExpoFP private email, add private email to db entry
async function login() {
  /*-| Check if company is in server DB |-*/
  const serverExhibitor = await getCompany_Service(companyStore.id)

  console.log("Expo in past:" + expoLocal.expoInPast)

  /*-| If Expo has passed, only check the database. |-*/
  if (expoLocal.expoInPast) {
    companyStore.$patch({
      id: serverExhibitor.id,
      name: serverExhibitor.name,
      emailPrivate: serverExhibitor.privateEmail,
      login_Url: serverExhibitor.login_Url,
      lead_Ret: serverExhibitor.lead_Ret,
      expo_Year: serverExhibitor.expo_Year,
      expo_Client: serverExhibitor.expo_Client
    })
    await saveLogin_LocalDB(
      companyStore.id,
      companyStore.name,
      companyStore.emailPrivate,
      companyStore.login_Url,
      serverExhibitor.lead_Ret,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
      status
    )
  }
  /*-| If Expo is not over, check ExpoFP for info. |-*/
  else if (!expoLocal.expoInPast) {
    console.log("Getting company...")
    const exhibFP = await getFPExhibitor(
      companyStore.id,
      expoLocal.expo_Client,
      expoLocal.expo_Year
    )
    console.log("Got company company from ExpoFP: ", exhibFP)

    companyStore.$patch({
      id: exhibFP.id,
      name: exhibFP.name,
      emailPrivate: exhibFP.emailPrivate,
      login_Url: exhibFP.autoLoginUrl,
      lead_Ret: extraMatch.value,
      expo_Year: expoLocal.expo_Year,
      expo_Client: expoLocal.expo_Client
    })

    /*-| Check for Lead Retrieval
    ---+----+---+----+---+----+---+----+---*/
    await checkLeadRetPurch()

    /*-| Prep ExpoFP Login |-*/
    console.log("Logging in for: ", companyStore.name)
    console.log("loginURL is: ", companyStore.login_Url)

    /*-| Save to local DB |-*/
    console.log("Saving company to Local DB...")
    await saveLogin_LocalDB(
      companyStore.id,
      companyStore.name,
      companyStore.emailPrivate,
      companyStore.login_Url,
      extraMatch.value,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
      status
    )
    await createExhibitor_Service(companyStore)
    console.log("GETTING DEBUG")
    await getCompany_Service(companyStore.id)
  }
  sessionStore.logged_In = true
  /*if (exhibitorLocal.lead_Ret) {
    await router.push({name: 'Lead Table'})
  }*/
}

async function scanUpdates(id: number) {
  console.log("Why do I exist???")// exhibFP.updatedAt)
}

// TODO add function that compares ExpoFP & DB results
// Updates data where appropriate (loginURL, etc)
// Should not update lead retrieval after expo date has passed.

async function checkLeadRetPurch() {
  console.log("Matching extras...")
  exhibitorExtras.value = await getFPExhibitorExtras(
    companyStore.id,
    expoLocal.expo_Client,
    expoLocal.expo_Year)
  console.log("company extras are: ", exhibitorExtras.value)
  /*-| Look for Lead Ret match |-*/
  extraMatch.value = await exhibitorExtras.value.some((e: any) =>
    e.name.toLowerCase().includes("lead retrieval")
  )
  console.log("Lead retrieval purchased: ", extraMatch.value)
}

</script>
