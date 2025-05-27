'use client'
import { Box, Drawer, Typography, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useCarStore from '@/stores/useCarStore';
import useLanguageStore from '@/stores/useLanguageStore';
import useMenusStore from '@/stores/useMenusStore';

const drawerWidth = 240;
const appBarHeight = 64;

const DrawerComponents = () => {
  const { carsInfo, selectedCar, setSelectedCar } = useCarStore();
  const { lang, dir } = useLanguageStore();
  const { isDrawerOpen } = useMenusStore()

  const { t } = useTranslation('translation');
  const pathname = usePathname();

  const menuItems = [
    { text: t('drawer.dashboard'), link: '/dashboard' },
    { text: t('drawer.cars'), link: '/cars' },
    { text: t('drawer.map'), link: '/map' },
  ];

  const handleClick = (e, car) => {
    setSelectedCar(car);
  };


  return (
    <Drawer
      key={lang}
      variant="temporary"
      anchor={lang === 'fa' ? 'left' : 'right'}
      open={isDrawerOpen}
      SlideProps={{
        direction: lang === 'fa' ? 'left' : 'right',
      }}
      ModalProps={{
        keepMounted: true,

      }}

      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: appBarHeight,
          height: `calc(100% - ${appBarHeight}px)`,
        },
      }}
    >
      <Box sx={{ p: 3 }} >
        <List >
          {menuItems.map((item) => (
            <Link href={item.link} key={item.link} passHref style={{ textDecoration: 'none' }}>
              <ListItem disablePadding selected={pathname === item.link}>
                <ListItemButton selected={pathname === item.link} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }
                }}>

                  <ListItemText primary={item.text} sx={{ textAlign: dir === 'rtl' ? 'left' : 'right' }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider sx={{ my: 4 }} />
        <List subheader={
          <Typography align="center" variant="h6" sx={{ my: 1 }}>
            {t('Your_Vehicles')}
          </Typography>
        }>
          {carsInfo.map((item) => (
            <ListItem disablePadding key={item.id} selected={selectedCar?.id === item.id}>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                  }
                }}
                onClick={(e) => handleClick(e, item)}
                selected={selectedCar?.id === item.id}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Box>
    </Drawer>
  );
};

export default DrawerComponents;
