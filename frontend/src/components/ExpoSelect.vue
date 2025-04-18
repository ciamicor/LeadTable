<template>
  <div class="container">
    <h2 class="col-12-300">Active Expos</h2>
    <div class="expo-select-container">
      <div
        v-for="(expo, i) in activeExposList"
        :key="i"
        class="grid-card"
      >
        <h3 class="--m-0">{{ expo.year }}</h3>
        <h1>{{ expo.expo_Client }}</h1>
        <span>{{ expo }}</span>
        <button @click="setCurrentExpo">Select Expo</button>
      </div>
    </div>
    <div class="row-12-300">
      <h2 class="col-12-300">Past Expos</h2>
      <div
        v-for="(expo, i) in archivedExposList"
        :key="i"
        class="col-12-300 col-6-600"
      >
        <h3 class="--m-0">{{ expo.year }}</h3>
        <h1>{{ expo.expo_Client }}</h1>
        <span>{{ expo }}</span>
        <button @click="setCurrentExpo">View Archived Expo</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import {useCompanyLocalStore, useExpoLocalStore} from '@/stores.ts'
import {getAllExpos_Service} from '@/services/ExpoDataService.ts'
import {onMounted, ref} from 'vue'

const allExposList = ref()
const archivedExposList = ref()
const activeExposList = ref()

async function getAllExpos(listObj) {
  await getAllExpos_Service(listObj)
  console.log(typeof allExposList, allExposList)
  archivedExposList.value = allExposList.value.filter((e) => e.active === false)
  activeExposList.value = allExposList.value.filter((e) => e.active === true)
}

async function setCurrentExpo() {
  useExpoLocalStore
}

onMounted(() => {
  getAllExpos(allExposList)
})

</script>

