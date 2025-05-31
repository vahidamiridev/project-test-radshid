"use client";

import { Box } from "@mui/material";
import AppBarComponent from '@/components/AppBarComponent';
import DrawerComponent from '@/components/DrawerComponent';
import MainContentComponent from '@/components/MainContentComponent';

const FleetDashboardLayout   = ({ children }) => {


  return (
    <Box sx={{ height: "100vh" , width:"100vw" }}>
      <AppBarComponent />
      <DrawerComponent />
      <MainContentComponent>
        {children}
      </MainContentComponent>
    </Box>
  );
};

export default FleetDashboardLayout ;
