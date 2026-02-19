import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusStore = defineStore("statusStore", () => {
  const status = ref("")

  function $reset() {
    status.value = ""
  }

  return {
    status,
    $reset
  }
})
