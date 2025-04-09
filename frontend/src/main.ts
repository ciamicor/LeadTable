import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, defineStore } from 'pinia'

/*-| Stores |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

export const companyLocalStore = defineStore('companyLocal', () => {
  const id = ref(null)
  const name = ref(null)
  const login_Url = ref(null)
  const lead_Ret = ref(null)
  const expo_Year = ref(2025)
  const expo_Client = ref('NYIFT')

  function $reset() {
    id.value = null
    name.value = null
    login_Url.value = null
    lead_Ret.value = null
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

/*-| App |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const pinia = createPinia()
const app = createApp(App)
// Global Variable/State
// https://vuejs.org/guide/components/provide-inject.html#provide-inject
app.use(pinia)
app.use(router)
app.mount('#app')

