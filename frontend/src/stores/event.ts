/*-| Event Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

export const useEventLocalStore = defineStore('eventLocal', () => {
  const active = ref(false)
  const eventId = ref(0)
  const dateStart = ref(null)
  const expoInPast: Ref<Boolean, Boolean> = ref(false)
  const expo_Client = ref('')
  const contactEmail = ref('')
  const clientFull = ref('')
  const name = ref('')
  const expo_Year = ref(0)
  const expoFp_Id = ref(0)
  const logoUrl_Color = ref('')
  const logoUrl_Black = ref('')
  const expoFp_MapUrl = ref('')
  const customFields = ref(null)
  const techSessions = ref(null)
  const paymentEnabled = ref(false)
  const leadEnabled = ref(false)
  const webpage = ref('')

  function $reset() {
    active.value = false
    eventId.value = 0
    dateStart.value = null
    expoInPast.value = false
    expo_Client.value = ''
    contactEmail.value = ''
    clientFull.value = ''
    name.value = ''
    expo_Year.value = 0
    expoFp_Id.value = 0
    logoUrl_Color.value = ''
    logoUrl_Black.value = ''
    expoFp_MapUrl.value = ''
    customFields.value = null
    techSessions.value = null
    paymentEnabled.value = false
    leadEnabled.value = false
    webpage.value = ''
  }

  return {
    active,
    eventId,
    expoInPast,
    dateStart,
    expo_Client,
    contactEmail,
    clientFull,
    name,
    expo_Year,
    expoFp_Id,
    paymentEnabled,
    leadEnabled,
    logoUrl_Color,
    logoUrl_Black,
    expoFp_MapUrl,
    customFields,
    webpage,
    $reset
  }
})
