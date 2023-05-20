import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  }).then(() => {
    console.log('i18next translations ready');
  });

export default i18nInstance;
