import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Displacement from './Displacement';

interface FormData {
  // Dimensions
  lbp: string;
  keelCorrection: string;

  // Initial Measurements
  distanceFore: string;
  distanceAft: string;
  distanceMid: string;
  distanceForeType: string;
  distanceAftType: string;
  distanceMidType: string;
  
  // Draft Readings
  forePort: string;
  foreStbd: string;
  aftPort: string;
  aftStbd: string;
  midPort: string;
  midStbd: string;
  quarterMean: string;
  trim:string;
  lbm:string;

  //Displacement values 
  density: string;
  draftSup: string;
  draftInf: string;
  
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

const StyledSelect = styled(Select)(({ theme }) => ({
  color: '#fff',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.light,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '.MuiSelect-icon': {
    color: theme.palette.primary.main,
  },
}));

const ValeursInitial: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    lbp: '173.000',
    keelCorrection: '0',
    distanceFore: '2.14',
    distanceAft: '8.17',
    distanceMid: '0.65',
    distanceForeType: 'A',
    distanceAftType: 'A',
    distanceMidType: 'A',
    forePort: '3.76',
    foreStbd: '3.76',
    aftPort: '5.87',
    aftStbd: '5.87',
    midPort: '4.85',
    midStbd: '4.88',
    quarterMean: '4.090',
    trim:'2.32',
    lbm:'168.90',
    density: '1025',
    draftSup: '3.76',
    draftInf: '5.87'
  });
  /**Assigner un rôle au btnCalc */
  const calculateValues = () => {
    try {
      // Calculate means
      const moyenneFor = ((parseFloat(formData.forePort) + parseFloat(formData.foreStbd)) / 2).toFixed(3);
      const moyenneAft = ((parseFloat(formData.aftPort) + parseFloat(formData.aftStbd)) / 2).toFixed(3);
      const moyenneMid = ((parseFloat(formData.midPort) + parseFloat(formData.midStbd)) / 2).toFixed(3);

      // Calculate LBM
      let lbp = parseFloat(formData.lbp);
      let lbm = 0; 
      const distanceFore = parseFloat(formData.distanceFore);
      const distanceAft = parseFloat(formData.distanceAft);

      if (formData.distanceForeType === "A" && formData.distanceAftType === "F") {
        lbm -= distanceFore - distanceAft;
      } else if (formData.distanceForeType === "F" && formData.distanceAftType === "A") {
        lbm += distanceFore + distanceAft;
      } else if (formData.distanceForeType === "A" && formData.distanceAftType === "A") {
        lbm += distanceFore + distanceAft;
      } else if (formData.distanceForeType === "F" && formData.distanceAftType === "F") {
        lbm += distanceFore - distanceAft;
      } else if (formData.distanceForeType === "N/A" && formData.distanceAftType === "N/A") {
        lbm = parseFloat(formData.lbp);
      } else if (formData.distanceForeType === "N/A" && formData.distanceAftType === "A") {
        lbm = parseFloat(formData.lbp) + distanceAft;
      } else if (formData.distanceForeType === "N/A" && formData.distanceAftType === "F") {
        lbm = parseFloat(formData.lbp) - distanceAft;
      } else if (formData.distanceForeType === "A" && formData.distanceAftType === "N/A") {
        lbm = parseFloat(formData.lbp) - distanceFore;
      } else if (formData.distanceForeType === "F" && formData.distanceAftType === "N/A") {
        lbm = parseFloat(formData.lbp) + distanceFore;
      }

      // Calculate Trim
      const trim = (parseFloat(moyenneAft) - parseFloat(moyenneFor)).toFixed(2);
      
       // Calcul des drafts Corrigés:
       let draftForeCorriged = 0;
       const distanceForeType = formData.distanceForeType; // Utiliser directement formData
       const trimValue = parseFloat(trim);
       let lbmValue = lbm;
       const distanceForeValue = parseFloat(distanceFore);
       const moyenneForValue = parseFloat(moyenneFor);
       
       if(distanceForeType === "A") {
         draftForeCorriged = moyenneForValue + (trimValue * distanceForeValue / lbp) * (trimValue > 0 ? -1 : 1);
       } else if(distanceForeType === "F") {
         draftForeCorriged = moyenneForValue + (trimValue * distanceForeValue / lbp) * (trimValue > 0 ? 1 : -1);
       }
       
       let draftAftCorriged = 0;
       const distanceAftType = formData.distanceAftType; // Utiliser directement formData
       const distanceAftValue = parseFloat(distanceAft);
        const moyenneAftValue = parseFloat(moyenneAft);
      
      // Calculate Quarter Mean
      const quarterMean = (((parseFloat(moyenneFor) + parseFloat(moyenneAft)) + (parseFloat(moyenneMid)*6) ) / 8).toFixed(3);
      
      
      
      
      
      
      
      // Update form data with calculated values
      setFormData(prev => ({
        ...prev,
        trim: trim,
        lbm: lbm.toFixed(2),
        quarterMean: quarterMean
      }));

    } catch (error) {
      console.error(error);
      alert("Error in calculations. Please check your input values.");
    }
  };
  /**HandleChanges */
  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ value: unknown }> | any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    console.log(formData);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Dimensions */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                Dimensions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="LBP (en m)"
                    value={formData.lbp}
                    onChange={handleChange('lbp')}
                    name='lbp'
                    id='lbp'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Keel Correction"
                    value={formData.keelCorrection}
                    onChange={handleChange('keelCorrection')}
                    name='keelCorrection'
                    id='keelCorrection'
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Initial Measurements */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                Initial Measurements
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }}>
                  <StyledTextField
                    fullWidth
                    label="Distance FORE (m)"
                    value={formData.distanceFore}
                    onChange={handleChange('distanceFore')}
                    name='distanceFore'
                    id='distanceFore'
                  />
                  <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel sx={{ color: 'primary.main' }}>Type</InputLabel>
                    <StyledSelect
                      value={formData.distanceForeType}
                      onChange={handleChange('distanceForeType')}
                      label="Type"
                      name='distanceForeType'
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                      <MenuItem value="N/A">N/A</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }}>
                  <StyledTextField
                    fullWidth
                    label="Distance AFT (m)"
                    value={formData.distanceAft}
                    onChange={handleChange('distanceAft')}
                    name='distanceAft'
                    id='distanceAft'
                  />
                  <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel sx={{ color: 'primary.main' }}>Type</InputLabel>
                    <StyledSelect
                      value={formData.distanceAftType}
                      onChange={handleChange('distanceAftType')}
                      label="Type"
                      name='distanceAftType'
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                      <MenuItem value="N/A">N/A</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }}>
                  <StyledTextField
                    fullWidth
                    label="Distance MID (m)"
                    value={formData.distanceMid}
                    onChange={handleChange('distanceMid')}
                    name='distanceMid'
                    id='distanceMid'
                  />
                  <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel sx={{ color: 'primary.main' }}>Type</InputLabel>
                    <StyledSelect
                      value={formData.distanceMidType}
                      onChange={handleChange('distanceMidType')}
                      label="Type"
                      name='distanceMidType'
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                      <MenuItem value="N/A">N/A</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Initial Draft Readings */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                Initial Draft Readings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="FORE Port"
                    value={formData.forePort}
                    onChange={handleChange('forePort')}
                    id='forePort'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="FORE Stbd"
                    value={formData.foreStbd}
                    onChange={handleChange('foreStbd')}
                    id='foreStbd'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="AFT Port"
                    value={formData.aftPort}
                    onChange={handleChange('aftPort')}
                    id='aftPort'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="AFT Stbd"
                    value={formData.aftStbd}
                    onChange={handleChange('aftStbd')}
                    id='aftStbd'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="MID Port"
                    value={formData.midPort}
                    onChange={handleChange('midPort')}
                    id='midPort'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="MID Stbd"
                    value={formData.midStbd}
                    onChange={handleChange('midStbd')}
                    id='midStbd'
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Quarter Mean"
                    value={formData.quarterMean}
                    onChange={handleChange('quarterMean')}
                    id='quarterMean'
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} mt={4}>
                  <StyledTextField
                    fullWidth
                    label="Trim"
                    value={formData.trim}
                    onChange={handleChange('trim')}
                    id='trim'
                  />
                </Grid>
                <Grid item xs={12} mt={4}>
                  <StyledTextField
                    fullWidth
                    label="LBM"
                    value={formData.lbm}
                    onChange={handleChange('lbm')}
                    id='lbm'
                  />
                </Grid>
                <Grid container justifyContent="center" mt={4}>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={calculateValues}
                    >
                      Calculate
                    </Button>
                  </Grid>
                </Grid>
            </StyledPaper>
            <Displacement
              density={Number(formData.density)}
              draftSup={Number(formData.draftSup)}
              quarterMean={Number(formData.quarterMean)}
              draftInf={Number(formData.draftInf)}
            />
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ValeursInitial;