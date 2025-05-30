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
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';


const AppBarComponent = () => {

  const { toggleDrawer } = useMenusStore();
  const { logout, userInfo } = useAuthStore.getState();

  const router = useRouter()
  const appBarHeight = 64;


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
          <Avatar src={"https://api.radshid.com/"+userInfo.profileImage} alt={userInfo.user} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle2" sx={{ color: 'white' }}>
            {userInfo.user}
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

export default AppBarComponent;
