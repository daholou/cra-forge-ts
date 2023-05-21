import i18n from 'i18next';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(HttpBackend)
  .use(LanguageDetector)
  .init<HttpBackendOptions>({
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/cra-forge-ts/locales/{{lng}}/{{ns}}.json'
    }
  }).then(() => {
    console.log('i18next translations ready');
  });

export default i18nInstance;
