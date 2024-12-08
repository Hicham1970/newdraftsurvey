import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SailingIcon from '@mui/icons-material/Sailing';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.4)',
}));

const StyledButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: active ? '#4A919E' : theme.palette.primary.main,
  marginLeft: theme.spacing(2),
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(74, 145, 158, 0.08)',
    color: '#4A919E',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: active ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
    height: '2px',
    width: '80%',
    backgroundColor: '#4A919E',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'translateX(-50%) scaleX(1)',
  }
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledAppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SailingIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ color: '#4A919E' }}>
            Draft Survey
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <StyledButton 
            onClick={() => navigate('/')}
            active={location.pathname === '/'}
          >
            Vessel Info
          </StyledButton>
          <StyledButton 
            onClick={() => navigate('/caracteristics')}
            active={location.pathname === '/caracteristics'}
          >
            Caracteristics
          </StyledButton>
          <StyledButton 
            onClick={() => navigate('/initial-values')}
            active={location.pathname === '/initial-values'}
          >
            Initial Values
          </StyledButton>
          <StyledButton 
            onClick={() => navigate('/final-values')}
            active={location.pathname === '/final-values'}
          >
            Final Values
          </StyledButton>
          <StyledButton 
            onClick={() => navigate('/calculation')}
            active={location.pathname === '/calculation'}
          >
            Calculation
          </StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
