import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusStore = defineStore("statusStore", () => {
  const status = ref("")
  const statusGlobal = ref("")
  const loading = ref(false)

  function $reset() {
    status.value = ""
    statusGlobal.value = ""
    loading.value = false
  }

  return {
    status,
    statusGlobal,
    loading,
    $reset
  }
})
