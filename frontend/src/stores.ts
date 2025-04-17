import { defineStore } from 'pinia'
import { ref } from 'vue'

const useExpoLocalStore = defineStore('companyLocal', () => {
  const id = ref(0)
  const name = ref('')
  const login_Url = ref('')
  const lead_Ret = ref(false)
  const year = ref(2025)
  const expo_Client = ref('NYIFT') //ref<String>('NYIFT')

  function $reset() {
    id.value = 0
    name.value = ''
    login_Url.value = ''
    lead_Ret.value = false
    year.value = 0
    expo_Client.value = ''
  }

  return {
    id,
    name,
    login_Url,
    lead_Ret,
    year,
    expo_Client,
    $reset
  }
})

const useCompanyLocalStore = defineStore('companyLocal', () => {
  const id = ref(0)
  const name = ref('')
  const login_Url = ref('')
  const lead_Ret = ref(false)
  const year = ref(2025)
  const expo_Client = ref('NYIFT') //ref<String>('NYIFT')

  function $reset() {
    id.value = 0
    name.value = ''
    login_Url.value = ''
    lead_Ret.value = false
    year.value = 0
    expo_Client.value = ''
  }

  return {
    id,
    name,
    login_Url,
    lead_Ret,
    year,
    expo_Client,
    $reset
  }
})

export { useExpoLocalStore, useCompanyLocalStore }
