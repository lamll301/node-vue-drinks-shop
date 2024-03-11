import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)
app.use(VueAxios, { $request: axios })
app.use(router)
app.mount('#app')
