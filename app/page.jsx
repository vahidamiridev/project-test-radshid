'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

const SplashPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useAuth();


  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
    setLoading(false)
  }, [isAuthenticated])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress color="success" />
      <Typography mt={2}>در حال بررسی وضعیت ورود...</Typography>
    </Box>
  );
};

export default SplashPage;
