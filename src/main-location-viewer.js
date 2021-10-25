import '@/assets/css/public.postcss'
import '~at2@/foundations/at2-global.postcss'
import { createApp } from 'vue'
import LocationViewer from './LocationViewer'
const app = createApp(LocationViewer)
import i18n from './pulgIn-i18n'
app.use(i18n)
app.mount('#app')
