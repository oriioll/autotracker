import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initGmailAuthBridge } from './services/gmailAuthBridge'
import { getRememberedTheme } from './services/storagePreferences'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/main.css'

document.documentElement.dataset.theme =
	getRememberedTheme() ??
	(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

initGmailAuthBridge()
app.mount('#app')
