'use client'
import { Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useLanguageStore from '@/stores/useLanguageStore';
import useMenusStore from '@/stores/useMenusStore';


const DrawerComponent = () => {
  const { lang, dir } = useLanguageStore();
  const { isDrawerOpen, closeDrawer } = useMenusStore()

  const { t } = useTranslation('translation');
  const pathname = usePathname();
  const drawerWidth = 240;
  const appBarHeight = 64;

  const menuItems = [
    { id: 1, text: t('drawer.dashboard'), link: '/dashboard' },
    { id: 2, text: t('drawer.myVehicles'), link: '/vehiclesList' },
    { id: 3, text: t('drawer.map'), link: '/map' },
  ];

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
      <Box sx={{ p: 2 }} >
        <List>
          {menuItems.map((item) => (
            <Link href={item.link} key={item.id} passHref style={{ textDecoration: 'none' }}>
              <ListItem disablePadding selected={pathname === item.link}>
                <ListItemButton
                  selected={pathname === item.link}
                  onClick={closeDrawer}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#2b76d0',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#2b76d0cc',
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    sx={{ textAlign: dir === 'rtl' ? 'left' : 'right' }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider sx={{ my: 4 }} />

      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
