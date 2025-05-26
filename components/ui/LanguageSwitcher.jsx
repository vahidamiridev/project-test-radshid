"use client";

import { Button } from "@mui/material";
import useLanguageStore from "@/stores/useLanguageStore";

export default function LanguageSwitcher() {
const {toggleLanguage ,lang } =  useLanguageStore()

  return (
    <Button
      sx={{ fontWeight: "bold", px: 3 }}
      variant="contained"
      color="primary"
      onClick={toggleLanguage}
    >
        {lang === "fa" ? "EN" : "فا"}
    </Button>
  );
}
