import '@/assets/css/public.postcss'
import '~at2@/foundations/at2-global.postcss'
import { createApp } from 'vue'

import Editor from './Editor'

const app = createApp(Editor)
import i18n from './pulgIn-i18n'
app.use(i18n)
app.mount('#app')
// i18n.install(app, { globalInjection: true })
