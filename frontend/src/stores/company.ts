/*-| Company Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCompanyLocalStore = defineStore('companyLocal', () => {
  const id = ref(null)
  const name = ref('')
  const login_Url = ref('')
  const lead_Ret = ref(false)
  const expo_Year = ref(0)
  const expo_Client = ref('')

  function $reset() {
    id.value = null
    name.value = ''
    login_Url.value = ''
    lead_Ret.value = false
    expo_Year.value = 0
    expo_Client.value = ''
  }

  return {
    id,
    name,
    login_Url,
    lead_Ret,
    expo_Year,
    expo_Client,
    $reset
  }
})
