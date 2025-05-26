'use client'
import React from 'react';
import { Box, Container } from '@mui/material';
const MainContent = ({ children }) => {
  const appBarHeight = 64;
  const drawerWidth = 240;
  return (

    <Box
      component="main"
      sx={{

        flexGrow: 1,
        p: 1,
        mt: `${appBarHeight}px`,
        ml: `${drawerWidth}px`,
        overflow: "hidden",
        height: `calc(100vh - ${appBarHeight}px)`,
        width: `calc(100vw - ${drawerWidth}px)`,
        boxSizing: 'border-box'
      }}
    >
      <Container sx={{ width: "100%", height: "100%" }}>
        {children}
      </Container>
    </Box>
  );
};
export default MainContent;
