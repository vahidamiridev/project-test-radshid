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
import useLanguageStore from '@/stores/useLanguageStore';
import { useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cacheRtl = createEmotionCache();
export default function RootLayout({ children }) {
  const { lang, dir } = useLanguageStore();
  const pathname = usePathname();
  const isPublicPage = pathname === '/' || pathname === '/login';


  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);


  const theme = useMemo(
    () =>
      createTheme({
        direction: dir,
        typography: {
          fontFamily: "Vazir, IRANSans, Arial",
        },
      }),
    [dir]
  );


  return (
    <html suppressHydrationWarning>
      <body>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthGuard>
              {isPublicPage ? (
                children
              ) : (
                <FleetDashboardLayout >
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
