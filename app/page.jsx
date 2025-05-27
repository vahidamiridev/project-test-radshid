'use client'

import { CircularProgress, Box, Typography } from '@mui/material';
const SplashPage = () => {
  return (
    <Box
    sx={{width:"100%" , height:"100vh"}}
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
