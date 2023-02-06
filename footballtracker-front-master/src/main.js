import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
    .use(createPinia())
    .use(createVuestic())
    .use(router)
    .mount('#app')
