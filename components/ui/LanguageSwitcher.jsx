"use client";

import { Button } from "@mui/material";
import useLanguageStore from "@/stores/useLanguageStore";

export default function LanguageSwitcher() {
  const { toggleLanguage, lang } = useLanguageStore()

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={toggleLanguage}
      size="small"
      sx={{
        display:"block",
        mx:"1rem",
        minWidth: 'auto',  
        padding: '4px 8px',
        fontSize: '0.75rem', 
        lineHeight: 1,
      }}
    >
      {lang === "fa" ? "EN" : "فا"}
    </Button>

  );
}
