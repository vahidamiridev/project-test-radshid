"use client";
import '@/styles/globals.css';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@/theme/createEmotionCache';
import { AuthProvider } from '@/context/AuthContext';

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
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
