<template>
  <div class="view-mask">
    <div class="view-container">
      <router-view/>
    </div>
  </div>
  <nav v-if="route.path !== '/'"
       class="nav-bar">
    <router-link
      :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/floor-plan`"
      active-class="--secondary"
      class="button --stacked">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      Map
    </router-link>
    <router-link
      :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/leads-list`"
      active-class="--secondary"
      class="button --stacked">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      Leads
    </router-link>
    <router-link
      :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/profile`"
      active-class="--secondary"
      class="button --stacked">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      Profile
    </router-link>
  </nav>
</template>

<script
  setup>
import { db } from '@/db.js'
import { onBeforeMount } from 'vue'
import { useExpoLocalStore, useExhibitorLocalStore, useSessionStore } from '@/stores.js'
import { getUrl_ClientYear } from "@/services/functions/UrlService.ts";
import { getExpo_Service } from "@/services/ExpoDataService.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const sessionStore = useSessionStore()
const companyLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Hooks |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
onBeforeMount( async () => {
  console.log( "App mounting!" )
  await checkLoginState()
  let url = getUrl_ClientYear()
  expoLocal.$patch( {
    expo_Client: url[0],
    expo_Year: url[1]
  } )
  await getExpo_Service( url.client, url.year, expoLocal )
  console.log( 'Expo is: ', expoLocal )
  /*if ( sessionStore.logged_In === true ) {
    await checkExpoMatch()
  }*/
} )

/*-| Get Company from Local |-*/
/*---+----+---+----+---+----+---+----+---*/
async function checkLoginState() {
  try {
    let profile = await db.profile.get( 1 )
    if ( profile ) {
      companyLocal.$patch( {
        id: profile.ex_Id,
        lead_Ret: profile.lead_Ret,
        login_Url: profile.login_Url.toString(),
        name: profile.name.toString(),
        expo_Year: profile.expo_Year.toString(),
        expo_Client: profile.expo_Client.toString()
      } )
      sessionStore.logged_In = true
    }
    return companyLocal
  } catch ( e ) {
    console.error( e )
  }
}

/*-| Checks |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| Check if URL matches login |-*/
// TODO Move check into router beforeRoute function.
/*async function checkExpoMatch() {
  let clientMatch = expoLocal.expo_Client === companyLocal.expo_Client
  let yearMatch = expoLocal.expo_Year === parseInt( companyLocal.expo_Year )
  if ( !clientMatch || !yearMatch ) {
    alert( `Your login does not match selected expo. You've selected ${ expoLocal.expo_Client } ${ expoLocal.expo_Year }, but are logged in for ${ companyLocal.expo_Client } ${ companyLocal.expo_Year }. You'll be redirected.` )
    let url = getUrl_ClientYear()
    await router.push( `/${ companyLocal.expo_Client }/${ companyLocal.expo_Year }/${ url.view }` )
    url = getUrl_ClientYear()
    await getExpo_Service( url.client, url.year, expoLocal )
  }
}*/

</script>

<style>
@import "styles/main.css";
</style>
