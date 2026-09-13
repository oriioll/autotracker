import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { initGmailAuthBridge } from './services/gmailAuthBridge'

const app = createApp(App)
app.use(router)
initGmailAuthBridge()
app.mount('#app')
