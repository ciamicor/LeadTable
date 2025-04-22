import {defineStore} from 'pinia'
import {ref} from 'vue'

/*-| Expo Store |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useExpoLocalStore = defineStore('expoLocal', () => {
  const active = ref(false)
  const start_Date = ref(null)
  const expo_Client = ref('')
  const year = ref(0)
  const expoFp_Id = ref(0)
  const logoUrl_Color = ref('')
  const logoUrl_Black = ref('')
  const expoFp_MapUrl = ref('')

  function $reset() {
    active.value = false
    start_Date.value = null
    expo_Client.value = ''
    year.value = 0
    expoFp_Id.value = 0
    logoUrl_Color.value = ''
    logoUrl_Black.value = ''
    expoFp_MapUrl.value = ''
  }

  return {
    active,
    start_Date,
    expo_Client,
    year,
    expoFp_Id,
    logoUrl_Color,
    logoUrl_Black,
    expoFp_MapUrl,
    $reset,
  }
})

/*-| Company Store |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useCompanyLocalStore = defineStore('companyLocal', () => {
  const id = ref(0)
  const name = ref('')
  const login_Url = ref('')
  const lead_Ret = ref(false)
  const year = ref(0)
  const expo_Client = ref('')

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

export {useExpoLocalStore, useCompanyLocalStore}


