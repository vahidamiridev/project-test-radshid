
'use client'

import { Toolbar, AppBar, IconButton  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import useMenusStore from '@/stores/useMenusStore';

const AppBarComponents = () => {
  const {isDrawerOpen , toggleDrawer} = useMenusStore()


  const appBarHeight = 64;
  return (
    <AppBar
      position="fixed"
      sx={{ height: appBarHeight, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: appBarHeight }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};
export default AppBarComponents;
