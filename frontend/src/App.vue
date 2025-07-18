<template>
  <div class="view-mask">
    <div class="view-container">
      <router-view/>
    </div>
  </div>
  <nav v-if="route.path !== '/'"
       class="nav-bar">
    <router-link
      :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/floor-plan`"
      active-class="--secondary"
      class="button --p-8">
      <i class="bi-geo-alt-fill --m-r-4"/>
      Map
    </router-link>
    <router-link
      :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/leads-list`"
      active-class="--secondary"
      class="button --p-8">
      <i class="bi-person-circle --m-r-4"/>
      Leads
    </router-link>
    <router-link
      :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/profile`"
      active-class="--secondary"
      class="button --p-8">
      <i class="bi-gear-fill --m-r-4"/>
      Profile
    </router-link>
  </nav>
</template>

<script
  setup>
import { db } from '@/db.js'
import { onBeforeMount } from 'vue'
import { useExpoLocalStore, useCompanyLocalStore, useSessionStore } from '@/stores.js'
import { getUrl_ClientYear } from "@/services/functions/UrlFunc.js";
import { getExpo_Service } from "@/services/ExpoDataService.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Hooks |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
onBeforeMount( async () => {
  console.log( "App mounting!" )
  await checkLoginState()
  let url = getUrl_ClientYear()
  expoLocalData.$patch( {
    expo_Client: url[0],
    expo_Year: url[1]
  } )
  await getExpo_Service( url.client, url.year, expoLocalData )
  console.log( 'Expo is: ', expoLocalData )
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
      companyLocalData.$patch( {
        id: profile.ex_Id,
        lead_Ret: profile.lead_Ret,
        login_Url: profile.login_Url.toString(),
        name: profile.name.toString(),
        expo_Year: profile.expo_Year.toString(),
        expo_Client: profile.expo_Client.toString()
      } )
      sessionStore.logged_In = true
    }
    return companyLocalData
  } catch ( e ) {
    console.error( e )
  }
}

/*-| Checks |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| Check if URL matches login |-*/
// TODO Move check into router beforeRoute function.
/*async function checkExpoMatch() {
  let clientMatch = expoLocalData.expo_Client === companyLocalData.expo_Client
  let yearMatch = expoLocalData.expo_Year === parseInt( companyLocalData.expo_Year )
  if ( !clientMatch || !yearMatch ) {
    alert( `Your login does not match selected expo. You've selected ${ expoLocalData.expo_Client } ${ expoLocalData.expo_Year }, but are logged in for ${ companyLocalData.expo_Client } ${ companyLocalData.expo_Year }. You'll be redirected.` )
    let url = getUrl_ClientYear()
    await router.push( `/${ companyLocalData.expo_Client }/${ companyLocalData.expo_Year }/${ url.view }` )
    url = getUrl_ClientYear()
    await getExpo_Service( url.client, url.year, expoLocalData )
  }
}*/

</script>

<style>
@import "styles/main.css";
</style>
