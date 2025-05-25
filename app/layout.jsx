"use client";
import '@/styles/globals.css';
import "@/i18n/config"
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@/theme/createEmotionCache';
import { AuthGuard } from '@/guards/AuthGuard';

const cacheRtl = createEmotionCache();

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazir, IRANSans, Arial',
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CacheProvider value={cacheRtl}>
          <AuthGuard>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AuthGuard>
        </CacheProvider>
      </body>
    </html>
  );
}
