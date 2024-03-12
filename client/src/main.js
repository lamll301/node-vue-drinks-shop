import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.use(VueAxios, { $request: axios })
app.use(VueSweetalert2);
app.use(router)
app.mount('#app')
