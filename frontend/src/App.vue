<template>
  <sidebar-nav :toggled="showSidebarNav"
               @closeNav="toggleSidebarNav"/>
  <nav
    class="nav-bar">
    <!--    {{ session.data.user.role }}-->
    <button
      v-if="route.path !== '/'"
      id="toggle-nav-button"
      :class="showSidebarNav ? ' --warn ' : ' --primary ' "
      class="button --p-v-4 --p-h-5 --font-size-18"
      @click="toggleSidebarNav">
      <i v-if="!showSidebarNav"
         class="bi-list"></i>
      <i v-if="showSidebarNav"
         class="bi-x-lg"></i>
    </button>
    <span id="page-title"
          class="--m-0">
      {{ route.name }}
    </span>
  </nav>
  <div class="view-mask">
    <div class="view-container">
      <StatusDisplay
        :status="loading"
        class="--place-self-center --p-v-24 --h-100"
      />
      <router-view v-if="!loading"/>
    </div>
  </div>
</template>

<script
  setup>
import SidebarNav from "@/components/navigation/SidebarNav.vue";
import StatusDisplay from "@/components/elements/StatusDisplay.vue";

import { db } from '@/db.js'
import { onBeforeMount, ref, watch } from 'vue'
import { getUrl_ClientYear } from "@/services/functions/UrlService.ts";
import { getExpo_Service } from "@/services/ExpoDataService.js";
import { useRoute } from "vue-router";
import { useEventLocalStore } from "@/stores/event.ts";
import { useCompanyLocalStore } from "@/stores/company.ts";
import { authClient } from "@/lib/auth-client.ts";

const route = useRoute()
const exhibitorLocal = useCompanyLocalStore()
const expoLocal = useEventLocalStore()
const session = authClient.useSession()

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Hooks |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

const loading = ref( false )
const error = ref( null )

async function fetchData( id ) {
  loading.value = true
  try {
    await checkCompanyState()
    let url = getUrl_ClientYear()
    expoLocal.$patch( {
      expo_Client: url[0],
      expo_Year: url[1]
    } )
    await getExpo_Service( url.client, url.year, expoLocal )
    console.log( 'Expo is: ', expoLocal )
  } catch ( err ) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

onBeforeMount( async () => {
  await fetchData()
} )

/*-| Get Company from Local |-*/
/*---+----+---+----+---+----+---+----+---*/
async function checkCompanyState() {
  try {
    let profile = await db.profile.get( 1 )
    if ( profile ) {
      exhibitorLocal.$patch( {
        id: profile.ex_Id,
        lead_Ret: profile.lead_Ret,
        login_Url: profile.login_Url.toString(),
        name: profile.name.toString(),
        expo_Year: profile.expo_Year.toString(),
        expo_Client: profile.expo_Client.toString()
      } )
    }
    return exhibitorLocal
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

</script>

<style>
@import "styles/main.css";
</style>
