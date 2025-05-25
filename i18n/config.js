// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationFa from '@/public/locales/fa/translation.json';
import translationEn from '@/public/locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: translationFa },
      en: { translation: translationEn },
    },
    lng: 'fa', 
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
