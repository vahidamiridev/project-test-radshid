"use client";

import { Box } from "@mui/material";
import AppBarComponents from '@/components/AppBar'
import DrawerComponents from '@/components/Drawer'
import MainContent from '@/components/MainContent '


const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBarComponents />
      <DrawerComponents />
      <MainContent />
    </Box>
  );
};

export default Layout;
