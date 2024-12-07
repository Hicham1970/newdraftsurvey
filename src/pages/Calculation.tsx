import React from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DraftSurveyReport from './DraftSurveyReport';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
  background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
}));

const Calculation: React.FC = () => {
  // Function to handle report generation
  const handleGenerateReport = () => {
    // Add logic for report generation if needed
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom sx={{ color: '#ff0000' }}>
              Draft Survey Calculation
            </Typography>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button 
                  variant="contained" 
                  color="warning"
                  onClick={handleGenerateReport}
                  sx={{ mb: 2 }}
                >
                  Generate Report
                </Button>
              </Grid>
            </Grid>
            <DraftSurveyReport />
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calculation;