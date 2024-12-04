import React from 'react';
import { Container, Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
  background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
}));

const Calculation: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom color="primary">
              Draft Survey Calculation
            </Typography>
            {/* Add your calculation form components here */}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calculation;