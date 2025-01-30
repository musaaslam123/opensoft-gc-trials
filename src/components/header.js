import { AppBar, Toolbar, Button, Typography, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  // backdropFilter: 'blur(5px)',
  // backgroundColor: 'rgba(0, 0, 0, 0.1)',
}));

const StyledToolbar = styled(Toolbar)({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 24px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
});

const LogoImage = styled('img')({
  height: '80px',
  width: 'auto',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: '20px',
  padding: '8px 22px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  color: 'white',
  border: '1px solid white',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
}));

const NavItem = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  cursor: 'pointer',
  position: 'relative',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '-4px',
    left: '50%',
    background: 'white',
    transition: 'all 0.3s ease',
  },
  '&:hover:after': {
    width: '100%',
    left: '0',
  },
}));

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem("token");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <StyledLink to="/">
          <LogoImage src="/logo_2.png" alt="MMM Flix" />
        </StyledLink>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
        <NavItem component={Link} to="/trending">Trending</NavItem>
          
          <NavItem component={Link} to="/popular">Popular</NavItem>
          <NavItem component={Link} to="/upcoming">Upcoming</NavItem>
          
          
          {!token ? (
            <>
            <StyledButton component={Link} to="/login">
              Login
            </StyledButton>
            <StyledButton component={Link} to="/register" >
            Register
          </StyledButton>
            </>
            
          ) : (
            <StyledButton onClick={handleLogout}>
              Logout
            </StyledButton>
          )}
          
        </Box>

        <IconButton
          size="large"
          edge="end"
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'rgba(33, 150, 243, 0.95)',
              marginTop: '8px',
            },
          }}
        >
          <MenuItem component={Link} to="/movies" onClick={handleClose}>Movies</MenuItem>
          <MenuItem component={Link} to="/series" onClick={handleClose}>Series</MenuItem>
          <MenuItem component={Link} to="/trending" onClick={handleClose}>Trending</MenuItem>
          {!token ? (
            <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
          ) : (
            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
          )}
      
        </Menu>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Header;