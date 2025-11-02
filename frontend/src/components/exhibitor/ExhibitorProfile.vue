<template>
  <div v-if="sessionStore.logged_In === true"
       class="container --align-content-center --p-6">
    <div>
      <p class="--m-b-10">More profile features coming soon.</p>
      <div class="row-12-300">
        <a :href="`https://app.expofp.com${exhibitorLocal.login_Url}`"
           class="button"
           target="_blank">
          ExpoFP
          <i class="--m-l-4 bi-arrow-up-right-square"></i>
        </a>
        <a :href="`https://app.expofp.com${exhibitorLocal.login_Url.replace('edit?', 'editprofile?')}`"
           class="button"
           target="_blank">
          Edit Profile
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
        {{ expoLocal.expo_Client }} {{ expoLocal.expo_Year }} Supplier's Day
      </h4>
      <h1>Exhibitor Login</h1>
      <p>If you've already purchased lead retrieval, login here to access it.</p>
      <p v-if="!expoLocal.expoInPast">
        To purchase lead retrieval, login to your ExpoFP Exhibitor profile here, and add it as a
        booth extra.</p>
      <label
        for="profileUrl">
        Login ID
      </label>
      <p>{{ testId }}</p>
      <input id="loginId"
             v-model="exhibitorLocal.id"
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
      {{ exhibitorLocal }}
      <h2>Extras</h2>
      {{ companyExtras }}
    </div>
  </div>
  <div
    v-if="sessionStore.logged_In === true && expoLocal.expoInPast === true"
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
  getFPExhibitor,
  getFPExhibitorExtras
} from '@/services/ExpoFPDataService.ts'
import {
  createExhibitor_Service,
  getExhibitor_Service,
} from '@/services/ExhibitorDataService.ts'
import {
  useExhibitorLocalStore,
  useExpoLocalStore,
  useSessionStore
} from '@/stores.ts'
import { type Ref, ref } from 'vue'
import { useRouter } from "vue-router";
import { saveLogin_LocalDB } from "@/services/LocalDBService.ts";
import ButtonSignOut from '../Button_SignOut.vue'
import { object } from "better-auth";

/*-| Variables
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(false)
const testId = ref(13286979)

const companyExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)

const sessionStore = useSessionStore()
const exhibitorLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()
const status = ref()

/*-| Login/Out |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
// TODO Add URL parameter detection to grab exhibitor id...
// TODO... then use that to sign in automatically.
async function login() {
  /*-| Check if exhibitor is in server DB |-*/
  const serverExhib = await getExhibitor_Service(exhibitorLocal.id)

  console.log("Expo in past:" + expoLocal.expoInPast)

  /*-| If Expo has passed, only check the database. |-*/
  if (expoLocal.expoInPast) {
    exhibitorLocal.$patch({
      id: serverExhib.id,
      name: serverExhib.name,
      login_Url: serverExhib.login_URL,
      lead_Ret: serverExhib.lead_Ret,
      expo_Year: serverExhib.expo_Year,
      expo_Client: serverExhib.expo_Client,
    })
    await saveLogin_LocalDB(
      exhibitorLocal.id,
      exhibitorLocal.name,
      exhibitorLocal.login_Url,
      serverExhib.lead_Ret,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
      status
    )
  }
  /*-| If Expo is not over, check ExpoFP for info. |-*/
  else if (!expoLocal.expoInPast) {
    console.log('Getting exhibitor...')
    const exhibFP = await getFPExhibitor(
      exhibitorLocal.id,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
    )
    console.log("Got exhibitor company from ExpoFP: ", exhibFP)

    exhibitorLocal.$patch({
      id: exhibFP.id,
      name: exhibFP.name,
      login_Url: exhibFP.autoLoginUrl,
      lead_Ret: extraMatch.value,
      expo_Year: expoLocal.expo_Year,
      expo_Client: expoLocal.expo_Client,
    })

    /*-| Check for Lead Retrieval |-*/
    /*---+----+---+----+---+----+---+----+---*/
    await checkLeadRetPurch()

    /*-| Prep ExpoFP Login |-*/
    console.log('Logging in for: ', exhibitorLocal.name)
    console.log('loginURL is: ', exhibitorLocal.login_Url)

    /*-| Save to local DB |-*/
    console.log('Saving company to Local DB...')
    await saveLogin_LocalDB(
      exhibitorLocal.id,
      exhibitorLocal.name,
      exhibitorLocal.login_Url,
      extraMatch.value,
      expoLocal.expo_Client,
      expoLocal.expo_Year,
      status
    )
    await createExhibitor_Service(exhibitorLocal)
    console.log("GETTING DEBUG")
    await getExhibitor_Service(testId.value)
  }
  sessionStore.logged_In = true
  /*if (exhibitorLocal.lead_Ret) {
    await router.push({name: 'Lead Table'})
  }*/
}

async function scanUpdates(id: number) {
  console.log('Why do I exist???')// exhibFP.updatedAt)
}

// TODO add function that compares ExpoFP & DB results
// Updates data where appropriate (loginURL, etc)
// Should not update lead retrieval after expo date has passed.

async function checkLeadRetPurch() {
  console.log('Matching extras...')
  companyExtras.value = await getFPExhibitorExtras(
    exhibitorLocal.id,
    expoLocal.expo_Client,
    expoLocal.expo_Year)
  console.log("exhibitor extras are: ", companyExtras.value)
  /*-| Look for Lead Ret match |-*/
  extraMatch.value = await companyExtras.value.some((e: any) =>
    e.name.toLowerCase().includes('lead retrieval')
  )
  console.log("Lead retrieval purchased: ", extraMatch.value)
}

</script>
