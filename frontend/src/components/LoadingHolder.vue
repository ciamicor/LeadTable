<template>
  <div v-show="props.status"
       class="--w-max-content">
    <p>{{ props.message }}</p>
  </div>
</template>
<script lang="ts"
        setup>
const props = defineProps({
  status: Boolean,
  message: {type: String, default: "Loading..."}

})
</script>
