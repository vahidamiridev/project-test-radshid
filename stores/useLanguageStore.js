import { create } from 'zustand';
import i18n from '@/i18n/config';

const useLanguageStore = create((set) => ({
  lang: 'fa',
  dir: 'rtl',
  toggleLanguage: () => {
    set((state) => {
      const newLang = state.lang === 'fa' ? 'en' : 'fa';
      const newDir = newLang === 'fa' ? 'rtl' : 'ltr';

      i18n.changeLanguage(newLang);
      localStorage.setItem('settings', JSON.stringify({
        lang,
        dir
      }));


      return { lang: newLang, dir: newDir };
    });
  },
}));

export default useLanguageStore;



