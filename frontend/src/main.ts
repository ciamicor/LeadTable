import {createApp} from 'vue'
import router from './router'
import App from './App.vue'

createApp(App)
  // Global Variable/State
  // https://vuejs.org/guide/components/provide-inject.html#provide-inject
  .provide(/* key */ 'expoYear', /* value */ 2025)
  .use(router)
  .mount('#app')
