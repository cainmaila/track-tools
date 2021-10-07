import { createI18n } from 'vue-i18n'
import en from './track-tools-locale/en.json'
import zhTW from './track-tools-locale/zh-TW.json'
import cn from './track-tools-locale/cn.json'
import ja from './track-tools-locale/ja.json'
export default createI18n({
  // legacy: false,
  locale: window.navigator.language, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    'zh-TW': zhTW,
    en,
    cn,
    ja,
  },
})
