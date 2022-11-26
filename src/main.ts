import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

import 'normalize.css'
import './assets/style/index.css'

const app = createApp(App)

app.use(createPinia()).use(router).use(createPinia()).mount('#app')
