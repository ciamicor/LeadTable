import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, defineStore } from 'pinia'

/*-| Stores |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

export const useCompanyLocalStore = defineStore('companyLocal', () => {
  const id = ref(0)
  const name = ref('')
  const login_Url = ref('')
  const lead_Ret = ref(false)
  const expo_Year = ref(2025)
  const expo_Client = ref('NYIFT') //ref<String>('NYIFT')

  function $reset() {
    id.value = 0
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

/*-| App |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const pinia = createPinia()
const app = createApp(App)
// Global Variable/State
// https://vuejs.org/guide/components/provide-inject.html#provide-inject
app.use(pinia)
app.use(router)
app.mount('#app')

