import '@/types/electron.d.ts'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// Create Vue app instance
const app = createApp(App)

// Install plugins
const pinia = createPinia()
app.use(pinia)

// Mount app
app.mount('#app')
