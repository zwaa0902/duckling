import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const isProdMode = process.env.NODE_ENV === 'production';

// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    debug: (import.meta as any).env.DEV,
    react: {
      useSuspense: true,
    },
    lng: 'vi',
    fallbackLng: 'vi',
    supportedLngs: ['vi', 'en'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    defaultNS: 'translation',
    ns: ['translation'],
    backend: {
      loadPath: isProdMode ? '/duckling/locales/{{lng}}/{{ns}}.json' : '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
