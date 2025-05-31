'use client';

import { IconButton } from '@mui/material';
import i18n from '@/i18n/config';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('fa');

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify({
      lang: 'fa',
      dir: 'rtl'
    }));


    document.documentElement.dir = "rtl";
    i18n.changeLanguage("fa");
  }, []);

  const toggleLanguage = () => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {
      lang: 'fa',
      dir: 'rtl'
    };

    const newLang = settings.lang === 'fa' ? 'en' : 'fa';
    const newDir = newLang === 'fa' ? 'rtl' : 'ltr';

    const newSettings = {
      lang: newLang,
      dir: newDir
    };

    localStorage.setItem('settings', JSON.stringify(newSettings));
    setLang(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newDir;
  };

  return (
    <IconButton
      onClick={toggleLanguage}
      sx={{
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <img
        src={lang === 'fa' ? 'img/icon-en.png' : 'img/icon-fa.png'}
        alt="language switch"
        style={{ width: '100%', height: '100%' }}
      />
    </IconButton>
  );
}
