import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { Box, Tooltip, Avatar, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { ResponsiveTypography } from '../components/ResponsiveTypography';


export const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser } = useAuth();
 

    const handleSignOut = () => {
        signOut(auth).then(() => {
          //Sign-out successful
        }).catch((error) => {
          //An error happened
        })
      };
      
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
          setMenuOpen(true)
      };
  
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setMenuOpen(false)
      };

  return  authUser ? (
        <>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <ResponsiveTypography>Welcome back {authUser.displayName}!</ResponsiveTypography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="More Options">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="user" src="/images/human.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menuOpen}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key='newcharacter' onClick={handleCloseUserMenu}>
                  <Typography variant="body2" textAlign="center">
                    <Link to='/newcharacter' style={{ textDecoration: 'none', color: '#fdf0d5'}}>
                      New Character
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key='viewcharacters' onClick={handleCloseUserMenu}>
                  <Typography variant="body2" textAlign="center">
                    <Link to='/viewcharacters' style={{ textDecoration: 'none', color: '#fdf0d5'}}>
                      View Characters
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key='logout' onClick={handleSignOut}>
                  <Typography textAlign="center" variant="body2">
                    <Link to='/signin' style={{ textDecoration: 'none', color: '#fdf0d5'}}>
                      Logout
                    </Link>
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
      </>
      ) : (
      <ResponsiveTypography>Signed Out</ResponsiveTypography>
      )
    } 

