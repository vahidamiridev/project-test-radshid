'use client'
import React from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import useCarStore from '@/stores/useCarStore';
const DrawerComponents = () => {
  const { carsInfo } = useCarStore();
  const { t } = useTranslation('translation');
  const pathname = usePathname();
  const menuItems = [
    { text: t('drawer.dashboard'), link: '/dashboard' },
    { text: t('drawer.cars'), link: '/cars' },
    { text: t('drawer.map'), link: '/map' },
  ];
  const appBarHeight = 64;
  const drawerWidth = 240;


  const handleClick = (e) => {
    const id = e.currentTarget.getAttribute('data-title');
    const matchedCar = carsInfo.find(car => car.title === id);
    if (matchedCar) {
      console.log("خودرو پیدا شد:", matchedCar);
    } else {
      console.log("چنین خودرویی پیدا نشد");
    }
  };




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
      <Box
        sx={{ p: 3 }}

      >
        {menuItems.map((item) => (
          <Link href={item.link} key={item.text} style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                m: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                boxShadow: '0 2px 8px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',

                },
                cursor: "pointer",
                bgcolor: pathname === item.link ? "primary.main" : "inherit",
                color: pathname === item.link ? "white" : "inherit",

              }}
            >
              {item.text}
            </Typography>
          </Link>
        ))}
        <Divider sx={{ my: 2 }} />
        {carsInfo.map((item) => (
          <Typography
            onClick={(e) => handleClick(e)}
            key={item.id}
            data-id={item.title}
            variant="body1"
            sx={{
              p: 2,
              m: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              boxShadow: '0 2px 8px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',

              },
              cursor: "pointer",
              bgcolor: pathname === item.link ? "primary.main" : "inherit",
              color: pathname === item.link ? "white" : "inherit",

            }}
          >
            {item.title}
          </Typography>
        ))}


      </Box>
    </Drawer >
  );
};
export default DrawerComponents;
