<template>
  <div class="container">
    <div class="row-12-300 --place-content-center">
      <h2 class="col-9-300">Active Expos</h2>
    </div>
    <div class="expo-select-container">
      <div
        v-for="(expo, i) in activeExposList"
        :key="i"
        class="grid-card"
      >
        <div class="row-12-300 --align-items-center">
          <div class="col-5-300">
            <h3 class="--m-0">{{ expo.expo_Year }}</h3>
          </div>
          <div class="col-5-300">
            <!--            <span class="&#45;&#45;m-0">{{ expo.start_Date }}</span>-->
          </div>
        </div>
        <h1>{{ expo.expo_Client }}</h1>
        <button @click="setCurrentExpo(expo)">
          Select Expo
        </button>
      </div>
    </div>
    <div class="row-12-300 --place-content-center">
      <h2 class="col-9-300">Past Expos</h2>
    </div>
    <div class="expo-select-container">
      <div
        v-for="(expo, i) in archivedExposList"
        :key="i"
        class="grid-card"
      >
        <div class="row-12-300 --align-items-center">
          <div class="col-5-300">
            <h3 class="--m-0">{{ expo.expo_Year }}</h3>
          </div>
          <div class="col-5-300">
            <!--            <span class="&#45;&#45;m-0">{{ expo.start_Date }}</span>-->
          </div>
        </div>
        <h1>{{ expo.expo_Client }}</h1>
        <button @click="setCurrentExpo(expo)">
          View Archived Expo
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import { useExhibitorLocalStore, useExpoLocalStore } from '@/stores.ts'
import { getAllExpos_Service } from '@/services/ExpoDataService.ts'
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const router = useRouter()
const expoLocal = useExpoLocalStore()
const companyLocal = useExhibitorLocalStore()
const allExposList = ref()
const archivedExposList = ref()
const activeExposList = ref()

/*-| Lifecycle |-*/
/*---+----+---+----+---+----+---+----+---*/
onMounted(() => {
  getAllExpos(allExposList)
})

onMounted(async () => {
  setTimeout(() => {
    console.log(`${companyLocal.expo_Client}/${companyLocal.expo_Year}/leads-list`)
    if (companyLocal.expo_Year !== undefined && companyLocal.expo_Client !== '') {
      console.log('matched')
      console.log(`${companyLocal.expo_Client}/${companyLocal.expo_Year}/leads-list`)
      router.push(`${companyLocal.expo_Client}/${companyLocal.expo_Year}/leads-list`)
    }
  }, 500)
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
    obj.expo_Year,
    obj.expoFp_Id,
    obj.logoUrl_Color,
    obj.logoUrl_Black,
    obj.expoFp_MapUrl,
  )

  expoLocal.$patch({
    active: obj.active,
    start_Date: obj.start_Date,
    expo_Client: obj.expo_Client,
    expo_Year: obj.expo_Year,
    expoFp_Id: obj.expoFp_Id,
    logoUrl_Color: obj.logoUrl_Color,
    logoUrl_Black: obj.logoUrl_Black,
    expoFp_MapUrl: obj.expoFp_MapUrl,
  })
  console.log("Selected Expo", obj)

  // const dateVar = new Date(expoLocal.start_Date);
  // console.log(dateVar.toLocaleString());

  /*-| Update Route |-*/
  await router.push({path: "/" + expoLocal.expo_Client + "/" + expoLocal.expo_Year + "/profile"})
}

</script>

