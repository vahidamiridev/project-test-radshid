"use client";

import '@/styles/globals.css';
import "@/i18n/config";
import { usePathname } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@/theme/createEmotionCache';
import { AuthGuard } from '@/guards/AuthGuard';
import Layout from '@/components/layout';
import useLanguageStore from '@/stores/useLanguageStore';
import { useEffect, useMemo } from 'react';

const cacheRtl = createEmotionCache();




export default function RootLayout({ children }) {
  const { lang, dir } = useLanguageStore();
  const pathname = usePathname();
  const isPublicPage = pathname === '/' || pathname === '/login';


useEffect(() => {
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  // document.body.classList.remove("rtl", "ltr");
  // document.body.classList.add(dir);
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
                <Layout>{children}</Layout>
              )}
            </AuthGuard>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
