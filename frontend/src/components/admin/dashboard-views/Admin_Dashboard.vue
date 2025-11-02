<template>
  <p>This is the admin dashboard.</p>
  {{allExpos}}
  <div v-for="expo in allExpos"
       :key="expo.expoFp_Id">
    {{expo.expo_Client}}
  </div>
</template>

<script lang="ts"
        setup>
import { getAllExpos_Service } from "@/services/ExpoDataService.ts";
import { ref } from "vue";
import { onMounted } from "vue";

let allExpos = ref();

async function getAllExpos() {
  await getAllExpos_Service(allExpos)
}

onMounted(() => {
  getAllExpos()
})
</script>
