import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en/translation.json'; // Importez vos fichiers de traduction
import frTranslation from '../locales/fr/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  lng: 'fr', // Langue par défaut
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false, // Ne pas échapper les valeurs traduites pour React
  },
});

export default i18n;
