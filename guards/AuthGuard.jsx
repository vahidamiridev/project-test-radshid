'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    // اگه کاربر تو صفحه لاگینه، گارد رو غیرفعال کن
    if (pathname === '/login') {
      setIsAuthorized(true);
      return;
    }

    if (!token) {
      logout();
      router.replace('/login');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [pathname]);

  if (isAuthorized === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthorized === false) {
    return null; // در حال ریدایرکت شدن به لاگین
  }

  return children;
};
