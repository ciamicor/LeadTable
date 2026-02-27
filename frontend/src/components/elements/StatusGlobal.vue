<template>
  <div v-show="props.statusGlobal"
       id="status-global"
  >
    <p>{{ props.statusGlobal }}</p>
  </div>
</template>
<script lang="ts"
        setup>
const props = defineProps({
  statusGlobal: {type: String, default: null}

})
</script>
