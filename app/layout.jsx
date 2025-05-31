"use client";

import '@/styles/globals.css';
import "@/i18n/config";
import { usePathname } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@/theme/createEmotionCache';
import { AuthGuard } from '@/guards/AuthGuard';
import FleetDashboardLayout from '@/components/FleetDashboardLayout';
import { useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import i18n from '@/i18n/config';
import 'react-toastify/dist/ReactToastify.css';

const cacheRtl = createEmotionCache();

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isPublicPage = pathname === '/' || pathname === '/login';

  const [settings, setSettings] = useState({
    lang: 'fa',
    dir: 'rtl',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('settings')) || {
      lang: 'fa',
      dir: 'rtl',
    };
    setSettings(stored);
    document.documentElement.lang = stored.lang;
    document.documentElement.dir = stored.dir;
      i18n.changeLanguage(stored.lang);
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      direction: settings.dir,
      typography: {
        fontFamily: "Vazir, IRANSans, Arial",
      },
    });
  }, [settings.dir]);

  return (
    <html suppressHydrationWarning lang={settings.lang} dir={settings.dir}>
      <body>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthGuard>
              {isPublicPage ? (
                children
              ) : (
                <FleetDashboardLayout>
                  {children}
                  <ToastContainer position="bottom-left" />
                </FleetDashboardLayout>
              )}
            </AuthGuard>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
