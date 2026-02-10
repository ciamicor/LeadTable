<template>
  <iframe :src="expoLocalStore.expoFp_MapUrl"
          allow="clipboard-read; clipboard-write"
          class="view-floor-plan"
  >
  </iframe>
</template>
<script lang="ts"
        setup>
import {useExpoLocalStore} from "@/stores.ts";

const expoLocalStore = useExpoLocalStore()

</script>


