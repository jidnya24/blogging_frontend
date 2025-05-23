import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Logout as LogoutIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';

const Navbar = ({ isAuthenticated, user, setIsAuthenticated, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    handleCloseUserMenu();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = isAuthenticated
    ? [
        { text: 'Home', path: '/' },
        { text: 'Create Post', path: '/create-post' },
        { text: 'Dashboard', path: '/dashboard' },
      ]
    : [
        { text: 'Home', path: '/' },
        { text: 'Login', path: '/login' },
        { text: 'Register', path: '/register' },
      ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'black', height: '100%' }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                bgcolor: 'primary.dark',
                borderLeft: '4px solid white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'black' ,
      boxShadow: 'none',              
    mb: 0,                          
    p: 0 
     }}>
      <Container maxWidth={false} disableGutters sx={{ px: 0 }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, sm: 70 },
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
          }}
        >
         
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                letterSpacing: '.1rem',
                textAlign: 'left',
                width: '100%',
                display: 'block',
              }}
            >
              thought box.
            </Typography>
          </Box>

          
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 2,
              justifyContent: 'center',
              flexShrink: 1,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.7)',
                  borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                  borderRadius: 0,
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

         
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated && (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    display: { xs: 'none', sm: 'block' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px',
                  }}
                >
                  {user?.username?.split('_').join(' ')}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user ? user.username : 'User'}
                      src="/avatar.jpg"
                      sx={{
                        bgcolor: 'white',
                        color: 'black',
                        width: 32,
                        height: 32,
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

   
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, bgcolor: 'black' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
