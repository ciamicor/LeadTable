import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, defineStore } from 'pinia'

/*-| Stores |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

export const companyLocalStore = defineStore('companyLocal', () => {
  const ex_Id = ref(null)
  const name = ref(null)
  const login_Url = ref(null)
  const lead_Ret = ref(null)
  const expo_Year = ref(null)
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

console.log('BASE_URL', import.meta.env.BASE_URL)

