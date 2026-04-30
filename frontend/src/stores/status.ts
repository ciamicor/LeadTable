import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusStore = defineStore("statusStore", () => {
  const status = ref("")
  const statusGlobal = ref("")
  const loading = ref(false)
  const colorClass = ref("")

  function $reset() {
    status.value = ""
    statusGlobal.value = ""
    loading.value = false
    colorClass.value = ""
  }

  return {
    status,
    statusGlobal,
    loading,
    colorClass,
    $reset
  }
})
