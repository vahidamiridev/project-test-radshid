
'use client'

import { Toolbar, AppBar } from '@mui/material';

const AppBarComponents = () => {

  const appBarHeight = 64;
  const drawerWidth = 240;

  return (
    <AppBar
      position="fixed"
      sx={{ height: appBarHeight, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: appBarHeight }}>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponents;
