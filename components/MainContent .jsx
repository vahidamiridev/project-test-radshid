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
        // ml: `${drawerWidth}px`,
        overflow: "hidden",
        // height: `calc(100vh - ${appBarHeight}px)`,
        // height: `calc(100vh - ${appBarHeight}px)`,
        width:"100vw",
        height:"100%",
        boxSizing: 'border-box'
      }}
    >
      <Container sx={{ width: "100vw", height: "100%" }}>
        {children}
      </Container>
    </Box>
  );
};
export default MainContent;
