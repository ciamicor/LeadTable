<template>
  <div class="--p-h-12 --p-t-12 row-12-300 --justify-content-space-between --flex-basis-auto">
    <input id="search"
           v-model="searchTerm"
           name="search"
           placeholder="Search for Exhibitor"
           type="text">
    <LoadingHolder :status="status"
                   class="--place-self-center"/>
    <exhibitors-export v-if="exhibitorList"
                       :exhibitors-list="exhibitorList"
    />
  </div>

  <div class="lead-cards-container --align-content-start --justify-content-center --p-12 --gap-12 --m-b-24">
    <div v-for="(exhib, index) in displayExhibList"
         v-if="exhibitorList"
         :key="index"
         class="lead-card --gap-6"
    >
      <h4>{{ exhib.name }}</h4>
      <div class="row-12-300 --font-size-14">
        {{ exhib.details.city }} {{ exhib.details.state }}, {{ exhib.details.country }}
      </div>
      <div v-if="exhib.details.description"
           class="row-12-300 --font-size-14">
        {{
          exhib.details.description.toString()
            .replace(/<\/?p>/g, "")
            .replace(/\&\amp\;/g, "&")
            .replace(/<\/?br>/g, "")
            .replace(/\&n/g, "")
            .replace(/bsp;/g, " ")
            .replace(/<\/?.*>/, "")
        }}
      </div>
      <div class="row-12-300 --gap-6">
        <a v-if="exhib.details.website"
           :href="exhib.details.website"
           target="_blank">
          Website
        </a>
        <a :href="expoLocal.expoFp_MapUrl + '?' + exhib.externalId"
           target="_blank">
          View on Expo Floor
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import LoadingHolder from "@/components/LoadingHolder.vue";
import {
  useExhibitorLocalStore,
  useExpoLocalStore,
  useSessionStore
} from "@/stores.ts"

import { computed, onBeforeMount, ref } from "vue"
import { bulkReadExpoFPExhibitors } from "@/services/ExpoFPDataService.ts"
import { onMounted } from "vue"
import ExhibitorsExport from "@/components/exhibitor/ExhibitorsExport.vue"

const sessionStore = useSessionStore()
const exhibitorLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()

const searchTerm = defineModel({default: ""})

const status = ref(false)
const exhibitorList = ref()

onBeforeMount(async () => {
  status.value = true
  exhibitorList.value = await bulkReadExpoFPExhibitors(expoLocal.expo_Client, expoLocal.expo_Year, expoLocal.expoFp_Id)
  exhibitorList.value = await sortExpoFPExhibs(exhibitorList.value)
  status.value = false
})

const displayExhibList = computed(() => {
  return exhibitorList.value.filter((e: any) => {
    return e.name.replace(/[^a-zA-z0-9]/g, "")
      .toUpperCase()
      .trim()
      .includes(searchTerm.value.replace(/[^a-zA-z0-9]/g, "").toUpperCase().trim())
    // || e.name.toUpperCase().trim().includes(searchTerm.value.toUpperCase().trim())

  })
})

async function sortExpoFPExhibs(i: Array<{}>) {
  i.sort((
    a: any,
    b: any
  ) => {
    const nameA = a.name.toUpperCase().trim() // ignore upper and lowercase
    const nameB = b.name.toUpperCase().trim() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
  console.log("Sorted by exhibitor name.")
  return i
}

</script>

