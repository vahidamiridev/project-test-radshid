'use client'

import {
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Avatar,
  Typography,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useMenusStore from '@/stores/useMenusStore';
import useCarStore from '@/stores/useCarStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

const AppBarComponents = () => {
  const { isDrawerOpen, toggleDrawer } = useMenusStore();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter()


  const appBarHeight = 64;
  const user = {
    name: 'وحید امیری',
    avatarUrl: '/images/user.jpg',
  };

  const handleLogout = () => {
    logout()
    router.push('/login'); 
  };

  return (
    <AppBar
      position="fixed"
      sx={{ height: appBarHeight, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: appBarHeight, display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle2" sx={{ color: 'white' }}>
            {user.name}
          </Typography>
          <Tooltip title="خروج">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponents;
