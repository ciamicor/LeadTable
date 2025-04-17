<template>


  <div class="row-12-300">
    <div
      v-for="(expo, i) in activeExposList"
      class="col-12-300 col-6-600">
      <h1>{{ expo.expo_Client }}</h1>
      <h3>{{ expo.year }}</h3>
      <button @click="setCurrentExpo">Select Expo</button>
      <button @click="setCurrentExpo">View Archived Expo</button>
    </div>
    <div
      v-for="(expo, i) in archivedExposList"
      class="col-12-300 col-6-600">
      <h1>{{ expo.expo_Client }}</h1>
      <h3>{{ expo.year }}</h3>
      <button @click="setCurrentExpo">Select Expo</button>
      <button @click="setCurrentExpo">View Archived Expo</button>
    </div>
  </div>
  <div class="row-12-300">
    {{ allExposList }}
  </div>
</template>

<script lang="ts"
        setup>
import { useCompanyLocalStore, useExpoLocalStore } from '@/stores.ts'
import { getAllExpos_Service } from '@/services/ExpoDataService.ts'
import { onMounted, ref } from 'vue'

const allExposList = ref()
const archivedExposList = ref()
const activeExposList = ref()

async function getAllExpos(listObj) {
  await getAllExpos_Service(listObj)
}

async function setCurrentExpo() {
  useExpoLocalStore
}

onMounted(() => {
  getAllExpos(allExposList)
  console.log(typeof allExposList, allExposList)
  archivedExposList.value = allExposList.filter((e) => e.active === true)
  activeExposList.value = allExposList.filter((e) => e.active === true)
})

</script>

