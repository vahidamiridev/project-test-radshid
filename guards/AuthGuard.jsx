'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (!token && pathname !== '/login') {
      logout();
      router.replace('/login');
      return;
    }

    if (token && (pathname === '/' || pathname === '/login')) {
      router.replace('/dashboard');
      return;
    }

    setIsLoading(false);
  }, [pathname]);

  if (isLoading) {
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
