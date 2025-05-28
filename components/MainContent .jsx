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
        // p: 1,
        mt: `${appBarHeight}px`,
        overflow: "hidden",
        width:"100vw",
        height:"100%",
        boxSizing: 'border-box'
      }}
    >
      <Box sx={{ width: "100%", height: "100%"  }}>
        {children}
      </Box>
    </Box>
  );
};
export default MainContent;
