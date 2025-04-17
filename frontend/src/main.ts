import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, defineStore } from 'pinia'

/*-| Stores |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

/*-| App |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const pinia = createPinia()
const app = createApp(App)
// Global Variable/State
// https://vuejs.org/guide/components/provide-inject.html#provide-inject
app.use(pinia)
app.use(router)
app.mount('#app')
