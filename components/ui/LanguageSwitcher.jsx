'use client';

import { IconButton } from '@mui/material';
import useLanguageStore from '@/stores/useLanguageStore';

export default function LanguageSwitcher() {
  const { toggleLanguage, lang } = useLanguageStore();

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
