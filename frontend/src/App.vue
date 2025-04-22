<template>
  <div class="view-mask">
    <div class="view-container">
      <router-view/>
    </div>
  </div>
  <nav class="nav-bar">
    <router-link
      :to="`/${expoLocalData.expo_Client}/${expoLocalData.year}/floor-plan`"
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
      :to="`/${expoLocalData.expo_Client}/${expoLocalData.year}/leads-list`"
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
      :to="`/${expoLocalData.expo_Client}/${expoLocalData.year}/profile`"
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
import { ref, provide, onBeforeMount, onMounted } from 'vue'
import { useExpoLocalStore, useCompanyLocalStore } from '@/stores.js'
import { getUrl_ClientYear } from "@/services/functions/UrlFunc.js";
import { getExpo_Service } from "@/services/ExpoDataService.js";

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

/*-| REF |-*/
/*---+----+---+----+---+----+---+----+---*/
const activeCompId_Ref = ref()
const activeCompLeadRet_Ref = ref()
const activeCompUrl_Ref = ref( '' )
const activeCompName_Ref = ref( '' )

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Hooks |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
onBeforeMount( async () => {
  console.log( "App mounting!" )
  await updateCompany()
  let url = getUrl_ClientYear()
  expoLocalData.$patch( {
    expo_Client: url[0],
    year: url[1]
  } )
  await getExpo_Service( url.client, url.year, expoLocalData )
} )

/*-| Get Company from Local |-*/
/*---+----+---+----+---+----+---+----+---*/
async function updateCompany() {
  await db.profile.get( 1 ).then( ( res ) => {
    if ( res ) {
      companyLocalData.$patch( {
        id: res.ex_Id,
        lead_Ret: res.lead_Ret,
        login_Url: res.login_Url.toString(),
        name: res.name.toString()
      } )
    }
    return companyLocalData
  } )
}

provide( 'expoYear_Global', companyLocalData.year )
provide( 'activeCompId_Global', activeCompId_Ref )
provide( 'activeCompLeadRet_Global', activeCompLeadRet_Ref )
provide( 'activeCompUrl_Global', activeCompUrl_Ref )
provide( 'activeCompName_Global', activeCompName_Ref )

</script>

<style>
@import "styles/main.css";
</style>
