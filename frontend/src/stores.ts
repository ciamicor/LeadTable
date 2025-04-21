import {defineStore} from 'pinia'
import {ref} from 'vue'

/*-| Expo Store |-*/

/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useExpoLocalStore = defineStore('expoLocal', () => {
  const active = ref(false)<Boolean>
  const start_Date = ref(null)<DateConstructor>
  const expo_Client = ref('')<String>
  const year = ref(0)<Number>
  const expoFp_Id = ref(0)<Number>
  const logoUrl_Color = ref('')<String>
  const logoUrl_Black = ref('')<String>
  const expoFp_MapUrl = ref('')<String>

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
  const id = ref(0)<Number>
  const name = ref('')<String>
  const login_Url = ref('')<String>
  const lead_Ret = ref(false)<Boolean>
  const year = ref(0)<Number>
  const expo_Client = ref('')<String>

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


