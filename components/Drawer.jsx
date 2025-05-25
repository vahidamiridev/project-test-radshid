'use client'
import React from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const DrawerComponents = () => {
  const pathname = usePathname();
   const menuItems = [
    { text: "داشبورد", link: "/dashboard" },
    { text: "خودرو ها", link: "/cars" },
    { text: "نقشه", link: "/map" },
  ];
     const appBarHeight = 64; 
      const drawerWidth = 240;
  return (
 <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            top: appBarHeight,
            height: `calc(100% - ${appBarHeight}px)`,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {menuItems.map((item) => (
            <Link href={item.link} key={item.text} style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{
                  p: 2,
                  cursor: "pointer",
                  bgcolor: pathname === item.link ? "primary.main" : "inherit",
                  color: pathname === item.link ? "white" : "inherit",
                  borderRadius:'3px'
                }}
              >
                {item.text}
              </Typography>
            </Link>
          ))}
        </Box>
      </Drawer>
  );
};

export default DrawerComponents;
