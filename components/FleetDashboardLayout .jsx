"use client";

import { Box } from "@mui/material";
import AppBarComponents from '@/components/AppBar';
import DrawerComponents from '@/components/DrawerComponents';
import MainContent from '@/components/MainContent ';

const Layout = ({ children }) => {


  return (
    <Box sx={{ height: "100vh" , width:"100vw" }}>
      <AppBarComponents />
      <DrawerComponents />
      <MainContent>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout;
