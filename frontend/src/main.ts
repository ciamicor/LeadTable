import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

createApp(App)
  // Global Variable/State
  // https://vuejs.org/guide/components/provide-inject.html#provide-inject
  .use(router)
  .mount('#app')

console.log('BASE_URL', import.meta.env.BASE_URL)
