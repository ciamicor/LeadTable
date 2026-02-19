<template>
  <iframe :src="expoLocalStore.expoFp_MapUrl"
          allow="clipboard-read; clipboard-write"
          class="view-floor-plan"
  >
  </iframe>
</template>
<script lang="ts"
        setup>

import { useEventLocalStore } from '@/stores/event.ts';

const expoLocalStore = useEventLocalStore()

</script>


