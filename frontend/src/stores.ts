import { defineStore } from 'pinia'
import { ref } from 'vue'

/*-| Session Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useSessionStore = defineStore('sessionStore', () => {
  const logged_In = ref(false)

  function $reset() {
    logged_In.value = false
  }

  return {
    logged_In,
    $reset,
  }
})

/*-| Event Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useExpoLocalStore = defineStore('expoLocal', () => {
  const active = ref(false)
  const eventId = ref(0)
  const start_Date = ref(null)
  const expo_Client = ref('')
  const clientFull = ref('')
  const name = ref('')
  const expo_Year = ref(0)
  const expoFp_Id = ref(0)
  const logoUrl_Color = ref('')
  const logoUrl_Black = ref('')
  const expoFp_MapUrl = ref('')
  const customFields = ref(null)
  const techSessions = ref(null)

  function $reset() {
    active.value = false
    eventId.value = 0
    start_Date.value = null
    expo_Client.value = ''
    clientFull.value = ''
    name.value = ''
    expo_Year.value = 0
    expoFp_Id.value = 0
    logoUrl_Color.value = ''
    logoUrl_Black.value = ''
    expoFp_MapUrl.value = ''
    customFields.value = null
    techSessions.value = null
  }

  return {
    active,
    eventId,
    start_Date,
    expo_Client,
    clientFull,
    name,
    expo_Year,
    expoFp_Id,
    logoUrl_Color,
    logoUrl_Black,
    expoFp_MapUrl,
    customFields,
    $reset,
  }
})

/*-| Company Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useExhibitorLocalStore = defineStore('companyLocal', () => {
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

/*-| Leads List Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const useLeadsListLocal = defineStore('companyLocal', () => {
  const map = ref(null)

  function $reset() {
    map.value = null
  }

  return {
    map,
    $reset
  }
})

export { useExpoLocalStore, useExhibitorLocalStore, useSessionStore, useLeadsListLocal }


