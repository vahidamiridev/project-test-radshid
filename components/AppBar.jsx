
'use client'

import { Toolbar, AppBar } from '@mui/material';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const AppBarComponents = () => {
  const appBarHeight = 64;
  return (
    <AppBar
      position="fixed"
      sx={{ height: appBarHeight,direction:"ltr", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: appBarHeight }}>
      <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};
export default AppBarComponents;
