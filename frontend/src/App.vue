<template>
  <sidebar-nav :toggled="showSidebarNav"
               @closeNav="toggleSidebarNav"/>
  <nav
    class="nav-bar">
    <span id="page-title"
          class="--m-0">
      {{ route.name }}
    </span>
    <button
      v-if="route.path !== '/'"
      id="toggle-nav"
      :class="showSidebarNav ? ' --warn ' : ' --primary ' "
      class="button p-8"
      @click="toggleSidebarNav">
      <i v-if="!showSidebarNav"
         class="bi-list"></i>
      <i v-if="showSidebarNav"
         class="bi-x-lg"></i>
    </button>
  </nav>
  <div class="view-mask">
    <div class="view-container">
      <router-view/>
    </div>
  </div>
</template>

<script
  setup>
import SidebarNav from "@/components/Navigation/SidebarNav.vue";
import { db } from '@/db.js'
import { onBeforeMount, ref } from 'vue'
import { useExpoLocalStore, useCompanyLocalStore, useSessionStore } from '@/stores.js'
import { getUrl_ClientYear } from "@/services/functions/UrlService.ts";
import { getExpo_Service } from "@/services/ExpoDataService.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const sessionStore = useSessionStore()
const companyLocal = useCompanyLocalStore()
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

/*-| Get Company from Local
---+----+---+----+---+----+---+----+---*/
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

/*-| Toggle Sidebar
---+----+---+----+---+----+---+----+---*/
const showSidebarNav = ref( false )

function toggleSidebarNav() {
  showSidebarNav.value = !showSidebarNav.value
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
