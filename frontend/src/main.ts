import {createApp, ref} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

/*-| Stores |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

/*-| App |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
