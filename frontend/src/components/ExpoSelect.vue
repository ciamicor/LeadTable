<template>
  <div class="container">
    <h2 class="col-12-300">Active Expos</h2>
    <div class="expo-select-container">
      <div
        v-for="(expo, i) in activeExposList"
        :key="i"
        class="grid-card"
      >
        <div class="row-12-300 --align-items-center">
          <div class="col-5-300">
            <h3 class="--m-0">{{ expo.year }}</h3>
          </div>
          <div class="col-5-300">
            <span class="--m-0">{{ expo.start_Date }}</span>
          </div>
        </div>
        <h1>{{ expo.expo_Client }}</h1>
        <span>{{ expo }}</span>
        <button @click="setCurrentExpo(expo)">Select Expo</button>
      </div>
    </div>
    <h2 class="col-12-300">Past Expos</h2>
    <div class="expo-select-container">
      <div
        v-for="(expo, i) in archivedExposList"
        :key="i"
        class="grid-card"
      >
        <div class="row-12-300 --align-items-center">
          <div class="col-5-300">
            <h3 class="--m-0">{{ expo.year }}</h3>
          </div>
          <div class="col-5-300">
            <span class="--m-0">{{ expo.start_Date }}</span>
          </div>
        </div>
        <h1>{{ expo.expo_Client }}</h1>
        <span>{{ expo }}</span>
        <button @click="setCurrentExpo(expo)">View Archived Expo</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import {useCompanyLocalStore, useExpoLocalStore} from '@/stores.ts'
import {getAllExpos_Service} from '@/services/ExpoDataService.ts'
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const router = useRouter()
const expoLocalData = useExpoLocalStore()
const companyLocalData = useCompanyLocalStore()
const allExposList = ref()
const archivedExposList = ref()
const activeExposList = ref()

/*-| Lifecycle |-*/
/*---+----+---+----+---+----+---+----+---*/
onMounted(() => {
  getAllExpos(allExposList)
})

/*-| Expo Functions |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function getAllExpos(listObj: any) {
  await getAllExpos_Service(listObj)
  console.log(typeof allExposList, allExposList)
  archivedExposList.value = allExposList.value.filter((e: any) => e.active === false)
  activeExposList.value = allExposList.value.filter((e: any) => e.active === true)
}

async function setCurrentExpo(obj: any) {
  console.log(
    obj.active,
    obj.start_Date,
    obj.expo_Client,
    obj.year,
    obj.expoFp_Id,
    obj.logoUrl_Color,
    obj.logoUrl_Black,
    obj.expoFp_MapUrl,
  )

  expoLocalData.$patch({
    active: obj.active,
    start_Date: obj.start_Date,
    expo_Client: obj.expo_Client,
    year: obj.year,
    expoFp_Id: obj.expoFp_Id,
    logoUrl_Color: obj.logoUrl_Color,
    logoUrl_Black: obj.logoUrl_Black,
    expoFp_MapUrl: obj.expoFp_MapUrl,
  })
  console.log("Selected Expo", obj)

  // const dateVar = new Date(expoLocalData.start_Date);
  // console.log(dateVar.toLocaleString());

  /*-| Update Route |-*/
  await router.push({path: "/" + expoLocalData.expo_Client + "/" + expoLocalData.year + "/profile"})
}

</script>

