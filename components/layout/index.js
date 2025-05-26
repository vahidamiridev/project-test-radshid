"use client";

import { Box } from "@mui/material";
import AppBarComponents from '@/components/AppBar';
import DrawerComponents from '@/components/DrawerComponents';
import MainContent from '@/components/MainContent ';
import useCarStore from '@/stores/useCarStore';
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { fetchCars, carsInfo } = useCarStore();

  useEffect(() => {
    if (!carsInfo || carsInfo.length === 0) {
      fetchCars();
    }
  }, [carsInfo, fetchCars]);

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBarComponents />
      <DrawerComponents />
      <MainContent>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout;
