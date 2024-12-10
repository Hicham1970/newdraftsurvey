import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddchartIcon from '@mui/icons-material/Addchart';
import StraightenIcon from '@mui/icons-material/Straighten';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { caracteristiquesAPI, CaracteristiquesData } from '../services/caracteristiquesServices';

interface FormData extends CaracteristiquesData {}

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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(2),
  fontSize: '1.1rem',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Caracteristiques: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    grossWeight: 0,
    netWeight: 0,
    summerDraft: 0,
    summerFreeboard: 0,
    summerDeadweight: 0,
    lightShip: 0,
    constanteDeclared: 0,
    loa: 0,
    breadth: 0,
    numberOfHolds: 0,
    numberOfBallastTks: 0,
    numberOfFWaterTks: 0,
  });

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: Number(event.target.value)
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async () => {
    try {
      // Validate that all numbers are valid before sending
      const validatedData: CaracteristiquesData = {
        grossWeight: Number(formData.grossWeight),
        netWeight: Number(formData.netWeight),
        summerDraft: Number(formData.summerDraft),
        summerFreeboard: Number(formData.summerFreeboard),
        summerDeadweight: Number(formData.summerDeadweight),
        lightShip: Number(formData.lightShip),
        constanteDeclared: Number(formData.constanteDeclared),
        loa: Number(formData.loa),
        breadth: Number(formData.breadth),
        numberOfHolds: Number(formData.numberOfHolds),
        numberOfBallastTks: Number(formData.numberOfBallastTks),
        numberOfFWaterTks: Number(formData.numberOfFWaterTks)
      };

      // Check if any value is NaN
      const invalidFields = Object.entries(validatedData)
        .filter(([_, value]) => isNaN(value))
        .map(([key]) => key);

      if (invalidFields.length > 0) {
        throw new Error(`Invalid number values for fields: ${invalidFields.join(', ')}`);
      }

      console.log('Sending data:', validatedData);
      await caracteristiquesAPI.create(validatedData);
      
      setSnackbar({
        open: true,
        message: 'Vessel characteristics saved successfully!',
        severity: 'success'
      });
    } catch (error: any) {
      console.error('Error details:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error saving vessel characteristics. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AddchartIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Vessel Characteristics
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Gross weight (MT)"
                    value={formData.grossWeight}
                    onChange={handleChange('grossWeight')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Net Weight (MT)"
                    value={formData.netWeight}
                    onChange={handleChange('netWeight')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Summer Draft (en m)"
                    value={formData.summerDraft}
                    onChange={handleChange('summerDraft')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Summer Freeboard (en m)"
                    value={formData.summerFreeboard}
                    onChange={handleChange('summerFreeboard')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Summer Deadweight (MT)"
                    value={formData.summerDeadweight}
                    onChange={handleChange('summerDeadweight')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Light Ship (MT)"
                    value={formData.lightShip}
                    onChange={handleChange('lightShip')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Constante declared (MT)"
                    value={formData.constanteDeclared}
                    onChange={handleChange('constanteDeclared')}
                    type="number"
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <StraightenIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Dimensions
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="LOA (en m)"
                    value={formData.loa}
                    onChange={handleChange('loa')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Breadth (en m)"
                    value={formData.breadth}
                    onChange={handleChange('breadth')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Number of Holds"
                    value={formData.numberOfHolds}
                    onChange={handleChange('numberOfHolds')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Number of Ballast Tks"
                    value={formData.numberOfBallastTks}
                    onChange={handleChange('numberOfBallastTks')}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Number of F. water Tks"
                    value={formData.numberOfFWaterTks}
                    onChange={handleChange('numberOfFWaterTks')}
                    type="number"
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <StyledButton
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save Vessel Characteristics
          </StyledButton>
        </Box>

        {/* Snackbar for feedback */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Caracteristiques;