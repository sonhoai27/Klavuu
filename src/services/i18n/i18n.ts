import i18n from 'i18next'

import * as Backend from 'i18next-xhr-backend';
import * as reactI18nextModule from 'react-i18next';
import * as LngDetector from 'i18next-browser-languagedetector';

const lngDetector = new LngDetector(null, {
  order: ['localStorage', 'querystring', 'cookie'],
  caches: ['localStorage'],
});
lngDetector.addDetector({
  name: 'customDetector',
  lookup() {
    return 'en';
  },
  cacheUserLanguage(lng) {
    if (lng.substring(0, 2) === 'en') {
      localStorage.setItem('i18nextLng', 'vi')
    } else {
      localStorage.setItem('i18nextLng', 'en')
    }
  },
})
i18n
  .use(lngDetector)
  .use(Backend)
  .use(reactI18nextModule.reactI18nextModule)
  .init({
    fallbackLng: 'vi',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{lng}}.json',
    },
  });

export default i18n
