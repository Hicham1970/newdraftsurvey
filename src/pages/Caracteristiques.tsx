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

interface FormData {
  // Vessel Characteristics
  grossWeight: string;
  netWeight: string;
  summerDraft: string;
  summerFreeboard: string;
  summerDeadweight: string;
  lightShip: string;
  constanteDeclared: string;
  
  // Dimensions
  loa: string;
  breadth: string;
  numberOfHolds: string;
  numberOfBallastTks: string;
  numberOfFWaterTks: string;
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

const Caracteristiques: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    grossWeight: '23 264.000',
    netWeight: '12 134.000',
    summerDraft: '10.542',
    summerFreeboard: '4.501',
    summerDeadweight: '38 037.000',
    lightShip: '8 287.000',
    constanteDeclared: '200.000',
    loa: '179.970',
    breadth: '29.800',
    numberOfHolds: '5',
    numberOfBallastTks: '16',
    numberOfFWaterTks: '2',
  });

  const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Net Weight (MT)"
                    value={formData.netWeight}
                    onChange={handleChange('netWeight')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Summer Draft (en m)"
                    value={formData.summerDraft}
                    onChange={handleChange('summerDraft')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Summer Freeboard (en m)"
                    value={formData.summerFreeboard}
                    onChange={handleChange('summerFreeboard')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Summer Deadweight (MT)"
                    value={formData.summerDeadweight}
                    onChange={handleChange('summerDeadweight')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Light Ship (MT)"
                    value={formData.lightShip}
                    onChange={handleChange('lightShip')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Constante declared (MT)"
                    value={formData.constanteDeclared}
                    onChange={handleChange('constanteDeclared')}
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Breadth (en m)"
                    value={formData.breadth}
                    onChange={handleChange('breadth')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Number of Holds"
                    value={formData.numberOfHolds}
                    onChange={handleChange('numberOfHolds')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Number of Ballast Tks"
                    value={formData.numberOfBallastTks}
                    onChange={handleChange('numberOfBallastTks')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Number of F. water Tks"
                    value={formData.numberOfFWaterTks}
                    onChange={handleChange('numberOfFWaterTks')}
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

export default Caracteristiques;