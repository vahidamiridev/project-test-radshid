'use client'

import { CircularProgress, Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      router.replace('/dashboard'); 
    } else {
      router.replace('/login');
    }
  }, []);

  return (
    <Box
      sx={{ width: "100%", height: "100vh" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="success" />
      <Typography mt={2}>در حال بررسی وضعیت ورود...</Typography>
    </Box>
  );
};

export default SplashPage;
