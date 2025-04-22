<template>
  <div v-show="props.status">
    <p>Loading...</p>
  </div>
</template>
<script lang="ts"
        setup>
const props = defineProps({
  status: Boolean
})
</script>
