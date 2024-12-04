import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface FormData {
  // Dimensions
  lbp: string;
  keelCorrection: string;

  // Initial Measurements
  distanceForeInitial: string;
  distanceAftInitial: string;
  distanceMidInitial: string;
  
  // Draft Readings
  forePort: string;
  foreStbd: string;
  aftPort: string;
  aftStbd: string;
  midPort: string;
  midStbd: string;
  quarterMean: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
  background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
  marginBottom: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
  '& input': {
    color: '#fff',
    textAlign: 'center',
  },
  '& label': {
    color: theme.palette.primary.main,
  },
}));

const ValeursInitial: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    lbp: '173.000',
    keelCorrection: '0',
    distanceForeInitial: '219.00',
    distanceAftInitial: '817.00',
    distanceMidInitial: '0.00',
    forePort: '376.00',
    foreStbd: '376.00',
    aftPort: '587.00',
    aftStbd: '587.00',
    midPort: '488.00',
    midStbd: '488.00',
    quarterMean: '487.35',
  });

  const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Dimensions */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#f0493f' }}>
                Dimensions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="LBP (en m)"
                    value={formData.lbp}
                    onChange={handleChange('lbp')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Keel Correction"
                    value={formData.keelCorrection}
                    onChange={handleChange('keelCorrection')}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Initial Measurements */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#f0493f' }}>
                Final Measurements
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="Distance FORE (cm)"
                    value={formData.distanceForeInitial}
                    onChange={handleChange('distanceForeInitial')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="Distance AFT (cm)"
                    value={formData.distanceAftInitial}
                    onChange={handleChange('distanceAftInitial')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="Distance MID (cm)"
                    value={formData.distanceMidInitial}
                    onChange={handleChange('distanceMidInitial')}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Draft Readings */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#f0493f' }}>
                Final Draft Readings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="FORE Port"
                    value={formData.forePort}
                    onChange={handleChange('forePort')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="FORE Stbd"
                    value={formData.foreStbd}
                    onChange={handleChange('foreStbd')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="AFT Port"
                    value={formData.aftPort}
                    onChange={handleChange('aftPort')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="AFT Stbd"
                    value={formData.aftStbd}
                    onChange={handleChange('aftStbd')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="MID Port"
                    value={formData.midPort}
                    onChange={handleChange('midPort')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="MID Stbd"
                    value={formData.midStbd}
                    onChange={handleChange('midStbd')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Quarter Mean"
                    value={formData.quarterMean}
                    onChange={handleChange('quarterMean')}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ValeursInitial;