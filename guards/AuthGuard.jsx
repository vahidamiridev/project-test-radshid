'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token && pathname !== '/login') {
      logout();
      router.replace('/login');
    }

    if (token && (pathname === '/' || pathname === '/login')) {
      router.replace('/dashboard');
    }

    setIsChecked(true);
  }, [pathname]);

  if (!isChecked) {
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

  return children;
};
