import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CastleIcon from '@mui/icons-material/Castle';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { useAuth } from '../context/AuthContext';

const pages = ['Sign In', 'Sign Up'];

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { authUser } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
    <AppBar position="static" sx={{
      backgroundColor: '#780000',
      border: '1px solid #780000 '
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CastleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fdf0d5' }} />
          <Typography
            variant="body1"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#fdf0d5',
              textDecoration: 'none',
              fontSize: { xs: '0.8rem', md: '1rem'}
            }}
          >
            <Link to="/" style={{ color: '#fdf0d5', textDecoration: 'none' }}>HOME</Link>
          </Typography>

          <CastleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fdf0d5' }} />
          <Typography
            variant="body1"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexShrink: 0,
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              fontSize: { xs: '0.8rem', md: '1rem'}
            }}
          >
            <Link to="/" style={{ color: '#fdf0d5', textDecoration: 'none' }}>HOME</Link>
          </Typography>
          {!authUser && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/signin' style={{ textDecoration: 'none' }}>
                <Button
                  size="small"
                  sx={{ my: 2, color: '#fdf0d5', display: 'block' }}
                >
                  Sign In
                </Button>
              </Link>
              <Link to='/signup' style={{ textDecoration: 'none' }}>
                <Button
                size="small"
                  sx={{ my: 2, color: '#fdf0d5', display: 'block' }}
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
          )}
          {authUser && (
            <UserMenu/> 
          )}        
        </Toolbar>
      </Container>
    </AppBar>
    <Menu
    id="menu-appbar"
    anchorEl={anchorElNav}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open={Boolean(anchorElNav)}
    onClose={handleCloseNavMenu}
    sx={{
      display: { xs: 'block', md: 'none' },
    }}
  >
    {pages.map((page) => (
      <MenuItem key={page} onClick={handleCloseNavMenu}>
        <Typography>{page}</Typography>
      </MenuItem>
    ))}
  </Menu>
  </>
  );
}

