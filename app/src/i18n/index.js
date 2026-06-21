import { createI18n } from 'vue-i18n'
import en from './en.json'
import hu from './hu.json'

const savedLocale = (() => {
  try { return localStorage.getItem('locale') ?? 'en' } catch { return 'en' }
})()

export default createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, hu },
})
