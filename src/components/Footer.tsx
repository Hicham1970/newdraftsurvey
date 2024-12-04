import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
  boxShadow: '0 -4px 20px 0 rgba(0,0,0,0.2)',
}));

const Footer: React.FC = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" color="primary" align="center">
          {' '}
          {new Date().getFullYear()} Draft Survey Calculator. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;