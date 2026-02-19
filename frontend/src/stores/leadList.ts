import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLeadsListLocal = defineStore('leadList', () => {
  const map = ref(null)

  function $reset() {
    map.value = null
  }

  return {
    map,
    $reset
  }
})
