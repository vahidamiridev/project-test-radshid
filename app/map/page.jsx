"use client";

import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import CarsListComponent from "@/components/CarsListComponent";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
    // loading: () => <div style={{ padding: 20 }}>در حال بارگذاری نقشه...</div>,
});

const MapPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "15%" },
          height: { xs: "30vh", lg: "100vh" },
          overflowY: "auto",
          borderBottom: { xs: "1px solid #ccc", sm: "none" },
        }}
      >
        <CarsListComponent />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "85%" },
          height: { xs: "70vh", lg: "100vh" },
        }}
      >
        <MapComponent />  
      </Box>
    </Box>
  );
};

export default MapPage;
