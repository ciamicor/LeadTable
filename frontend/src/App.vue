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
    <span class="--position-absolute --right-8">{{ statusStore.status }}</span>
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

import { db } from "@/db.js"
import { onBeforeMount, ref, watch } from "vue"
import { getUrl_ClientYear } from "@/services/functions/UrlService.ts";
import { getExpo_Service } from "@/services/ExpoDataService.js";
import { useRoute } from "vue-router";
import { useEventLocalStore } from "@/stores/event.ts";
import { useCompanyLocalStore } from "@/stores/company.ts";
import { useStatusStore } from "@/stores/status.ts";
import { authClient } from "@/lib/auth-client.ts";

const route = useRoute()
const companyStore = useCompanyLocalStore()
const eventStore = useEventLocalStore()
const statusStore = useStatusStore()

const session = authClient.useSession()

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Hooks |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

const loading = ref( false )
const error = ref( null )

async function fetchData( id ) {
  loading.value = true
  statusStore.status = "Loading..."
  try {
    await checkCompanyState()
    let url = getUrl_ClientYear()
    eventStore.$patch( {
      expo_Client: url[0],
      expo_Year: url[1]
    } )
    await getExpo_Service( url.client, url.year, eventStore )
    console.log( "Expo is: ", eventStore )
  } catch ( err ) {
    error.value = err.toString()
  } finally {
    loading.value = false
    statusStore.$reset()
  }
}

onBeforeMount( async () => {
  await fetchData()
} )

/*-| Get Company from Local |-*/
/*---+----+---+----+---+----+---+----+---*/
async function checkCompanyState() {
  try {
    let profile = await db.company.get( 1 )
    if ( profile ) {
      companyStore.$patch( {
        id: profile.ex_Id,
        lead_Ret: profile.lead_Ret,
        login_Url: profile.login_Url.toString(),
        name: profile.name.toString(),
        expo_Year: profile.expo_Year.toString(),
        expo_Client: profile.expo_Client.toString()
      } )
    }
    return companyStore
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
