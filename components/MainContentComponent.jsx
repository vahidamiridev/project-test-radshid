'use client'
import React from 'react';
import { Box } from '@mui/material';
const MainContentComponent = ({ children }) => {
  const appBarHeight = 64;
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
export default MainContentComponent;
