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
import { SelectChangeEvent } from '@mui/material/Select';
import Displacement from './Displacement';
import { parse } from 'path';
import DialpadIcon from '@mui/icons-material/Dialpad';

interface FormData {
  trimCorrected: number;
  // Dimensions
  lbp: number;
  keelCorrection: number;

  // Initial Measurements
  distanceFore: number;
  distanceAft: number;
  distanceMid: number;
  distanceForeType: string;
  distanceAftType: string;
  distanceMidType: string;
  
  // Draft Readings
  forePort: number;
  foreStbd: number;
  aftPort: number;
  aftStbd: number;
  midPort: number;
  midStbd: number;
  quarterMean: number;
  trim:number;
  lbm:number;

  //Displacement values 
  density: number;
  draftSup: number;
  draftInf: number;
  displacementSup: number;
  displacement:number;
  tpcSup: number;
  lcfSup: number;
  mtcSup: number;
  mtcPlus50: number;
  mtcMinus50: number;
  tpc: number;
  lcf: number;
  displacementInf: number;
  tpcInf: number;
  lcfInf: number;
  deltaMtc: number;
  
  firstTrimCorrection?: number;
  secondTrimCorrection?: number;
  totalTrimCorrection?: number;
  draftForeCorriged?: number;
  draftAftCorriged?: number;
  newDisplacementCorrectedByTrim?: number;
  newDisplacementCorrectedByDensity?: number;
  totalBallast?: number;
  freeshWater?: number;
  totalBunker?: number;
  lightShip?: number;
  others?: number;
  totalDeductibles?: number;
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

const ValeursFinal: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    lbp: 0,
    keelCorrection: 0,
    distanceFore: 0,
    distanceAft: 0,
    distanceMid: 0,
    distanceForeType: 'A',
    distanceAftType: 'A',
    distanceMidType: 'A',
    forePort: 0,
    foreStbd: 0,
    aftPort: 0,
    aftStbd: 0,
    midPort: 0,
    midStbd: 0,
    quarterMean: 0,
    trim:0,
    lbm:0,
    density: 1.025,
    draftSup: 0,
    draftInf: 0,
    displacementSup: 0,
    displacement:0,
    tpcSup: 0,
    lcfSup: 0,
    mtcSup: 0,
    mtcPlus50: 0,
    mtcMinus50: 0,
    tpc:0,
    lcf:0,
    displacementInf: 0,
    tpcInf: 0,
    lcfInf: 0,
    deltaMtc:0,
    trimCorrected:0,
    firstTrimCorrection:0,
    secondTrimCorrection:0,
    totalTrimCorrection:0,
    draftForeCorriged:0,
    draftAftCorriged:0,
    newDisplacementCorrectedByTrim:0,
    newDisplacementCorrectedByDensity:0,
    totalBallast:0,
    freeshWater:0,
    totalBunker:0,
    lightShip:0,
    others:0,
    totalDeductibles:0,
  
  });
  /**Assigner un rôle au btnCalc */
  const calculateValues = () => {
    try {
      // Calculate means
      const moyenneFor = (formData.forePort + formData.foreStbd) / 2;
      const moyenneAft = (formData.aftPort + formData.aftStbd) / 2;
      const moyenneMid = (formData.midPort + formData.midStbd) / 2;


      // Calculate LBM
      let lbp = formData.lbp;
      // Initialiser lbm avec la valeur de lbp
      let lbm = lbp;
      const distanceFore = formData.distanceFore;
      const distanceAft = formData.distanceAft;

      // Calcul du LBM en fonction des types de distance
      if (formData.distanceForeType === "A" && formData.distanceAftType === "F") {
        // LBM = LBP - Distance Avant - Distance Arrière
        lbm = lbp - distanceFore - distanceAft;
      } else if (formData.distanceForeType === "F" && formData.distanceAftType === "A") {
        // LBM = LBP + Distance Avant + Distance Arrière
        lbm = lbp + distanceFore + distanceAft;
      } else if (formData.distanceForeType === "A" && formData.distanceAftType === "A") {
        // LBM = LBP - Distance Avant - Distance Arrière
        lbm = lbp - distanceFore - distanceAft;
      } else if (formData.distanceForeType === "F" && formData.distanceAftType === "F") {
        // LBM = LBP + Distance Avant - Distance Arrière
        lbm = lbp + distanceFore - distanceAft;
      } else if (formData.distanceForeType === "N/A" && formData.distanceAftType === "A") {
        // LBM = LBP - Distance Arrière
        lbm = lbp - distanceAft;
      } else if (formData.distanceForeType === "N/A" && formData.distanceAftType === "F") {
        // LBM = LBP - Distance Arrière
        lbm = lbp - distanceAft;
      } else if (formData.distanceForeType === "A" && formData.distanceAftType === "N/A") {
        // LBM = LBP - Distance Avant
        lbm = lbp - distanceFore;
      } else if (formData.distanceForeType === "F" && formData.distanceAftType === "N/A") {
        // LBM = LBP + Distance Avant
        lbm = lbp + distanceFore;
      }
      // Si les deux sont N/A, lbm reste égal à lbp (pas besoin de condition)

      // formData.lbm = lbm.toFixed(2);
      console.log("LBP:", lbp, "DistanceFore:", distanceFore, "DistanceAft:", distanceAft, "LBM:", lbm);
      document.getElementById('lbm')?.setAttribute('value', lbm.toFixed(2));
      
      // Calculate Trim
         // Calculate Trim
         const trim = (moyenneAft) -(moyenneFor)
      
         // Calcul des drafts Corrigés:
         let draftForeCorriged = 0;
         const distanceForeType = formData.distanceForeType;
         const trimValue = trim;
         const lbmValue = lbm;
         const distanceForeValue = formData.distanceFore;
         const moyenneForValue = moyenneFor;
          
         if(distanceForeType === "A") {
           draftForeCorriged = moyenneForValue + (trimValue * distanceForeValue / lbmValue) * (trimValue > 0 ? -1 : 1);
         } else if(distanceForeType === "F") {
           draftForeCorriged = moyenneForValue + (trimValue * distanceForeValue / lbmValue) * (trimValue > 0 ? 1 : -1);
         } else if(distanceForeType === "N/A") {
           draftForeCorriged = moyenneForValue;
         }

       let draftAftCorriged = 0;
       const distanceAftType = formData.distanceAftType; // Utiliser directement formData
       const distanceAftValue = formData.distanceAft;
        const moyenneAftValue = moyenneAft;
         if (distanceAftType === "A") {
           draftAftCorriged = moyenneAftValue + (trimValue * distanceAftValue / lbmValue) * (trimValue > 0 ? -1 : 1);
         } else if (distanceAftType === "F") {
           draftAftCorriged = moyenneAftValue + (trimValue * distanceAftValue / lbmValue) * (trimValue > 0 ? 1 : -1);
         } else if (distanceAftType === "N/A") {
           draftAftCorriged = moyenneAftValue;
         }

         let draftMidCorriged = 0;
         const distanceMidType = formData.distanceMidType;
         const moyenneMidValue = moyenneMid;
         const distanceMidValue = formData.distanceMid;
         if (distanceMidType === "A") {
           draftMidCorriged = moyenneMidValue + (trimValue * distanceMidValue / lbmValue) * (trimValue > 0 ? -1 : 1);
         } else if (distanceMidType === "F") {
           draftMidCorriged = moyenneMidValue + (trimValue * distanceMidValue / lbmValue) * (trimValue > 0 ? 1 : -1);
         } else if (distanceMidType === "N/A") {
           draftMidCorriged = moyenneMidValue;
         }
          // Calculate Quarter Mean
      console.log("Values for quarterMean calculation:", {
        draftForeCorriged,
        draftAftCorriged,
        draftMidCorriged,

      });

      const kellCorrection = formData.keelCorrection;
      const quarterMean = (((draftForeCorriged + draftAftCorriged) + (draftMidCorriged*6) ) / 8)-kellCorrection;
      console.log("Calculated quarterMean:", quarterMean);
         console.log(formData)
      
      // Calculate draftSup and draftInf based on quarterMean
      const draftSup = Number(quarterMean) + 1;
      const draftInf = Number(quarterMean) - 1;
      
      // Calcul du displacement:
      
      
      
      
      // Update form data with calculated values
      setFormData(prev => ({
        ...prev,
        trim,
        lbm,
        quarterMean,
        draftForeCorriged,
        draftAftCorriged,
        distanceForeType,
        distanceAftType,
        distanceFore,
        distanceAft,
        moyenneFor,
        moyenneAft,
        moyenneMid,
        density: formData.density,
        draftSup,
        draftInf,
        displacementSup: formData.displacementSup,
        displacement: formData.displacement,
        tpcSup: formData.tpcSup,
        lcfSup: formData.lcfSup,
        mtcSup: formData.mtcSup,
        mtcPlus50: formData.mtcPlus50,
        mtcMinus50:  formData.mtcMinus50,
        tpc: formData.tpc,
        lcf: formData.lcf,
        displacementInf: formData.displacementInf,
        tpcInf: formData.tpcInf,
        lcfInf: formData.lcfInf,
        deltaMtc: formData.deltaMtc,
        trimCorrected: formData.trimCorrected,
        firstTrimCorrection: formData.firstTrimCorrection,
        secondTrimCorrection: formData.secondTrimCorrection,
        totalTrimCorrection: formData.totalTrimCorrection,
        newDisplacementCorrectedByTrim: formData.newDisplacementCorrectedByTrim,
        newDisplacementCorrectedByDensity: formData.newDisplacementCorrectedByDensity,
        totalBallast: formData.totalBallast,
        freeshWater: formData.freeshWater,
        totalBunker: formData.totalBunker,
        lightShip: formData.lightShip,
        others: formData.others,
        totalDeductibles: formData.totalDeductibles
      }));
    } catch (error) {
      console.error(error);
      alert("Error in calculations. Please check your input values.");
    }
  };
  /**HandleChanges */
  const handleChange = (prop: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>
  ) => {
    const value = event.target.value;
    
    // Liste des champs qui doivent rester des chaînes
    const stringFields = ['distanceForeType', 'distanceAftType', 'distanceMidType'];
    
    if (stringFields.includes(prop)) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [prop]: value
      }));
    } else {
      // Pour les champs numériques
      const normalizedValue = String(value).replace(',', '.');
      const numericValue = normalizedValue === '' ? 0 : parseFloat(normalizedValue);
      
      setFormData(prevFormData => ({
        ...prevFormData,
        [prop]: isNaN(numericValue) ? 0 : numericValue
      }));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Dimensions */}
          <Grid item xs={12}>
            <StyledPaper>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DialpadIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#ff0000' }}>
                  Dimensions
                </Typography>
              </Box>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DialpadIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#ff0000' }}>
                  Final Measurements
                </Typography>
              </Box>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DialpadIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#ff0000' }}>
                  Final Draft Readings
                </Typography>
              </Box>
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
                    value={(formData.quarterMean).toFixed(3)}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} mt={4}>
              <StyledTextField
                    fullWidth
                    label="Trim"
                    value={parseFloat(formData.trim.toFixed(2))}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                  />
                </Grid>
                <Grid item xs={12} mt={4}>
                <StyledTextField
                    fullWidth
                    label="LBM"
                    value={formData.lbm}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                  />
                </Grid>
                <Grid container justifyContent="center" mt={4}>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={calculateValues}
                    >
                      Calculate
                    </Button>
                  </Grid>
                </Grid>
            </StyledPaper>
            <Displacement
            type="final" 
            density={formData.density}
            draftSup={formData.draftSup}
            quarterMean={formData.quarterMean}
            draftInf={formData.draftInf}
            displacementSup={formData.displacementSup}
            displacement={formData.displacement}
            tpcSup={formData.tpcSup}
            lcfSup={formData.lcfSup}
            mtcPlus50={formData.mtcPlus50}
            mtcMinus50={formData.mtcMinus50}
            tpc={formData.tpc}
            lcf={formData.lcf}
            displacementInf={formData.displacementInf}
            tpcInf={formData.tpcInf}
            lcfInf={formData.lcfInf}
            deltaMtc={formData.deltaMtc}
            trimCorrected={formData.trimCorrected}
            firstTrimCorrection={formData.firstTrimCorrection ?? 0 }
            secondTrimCorrection={formData.secondTrimCorrection ?? 0 }
            totalTrimCorrection={formData.totalTrimCorrection ?? 0 }
            draftForeCorriged={formData.draftForeCorriged ?? 0}
            draftAftCorriged={formData.draftAftCorriged ?? 0}
            lbp={formData.lbp ?? 0}
            newDisplacementCorrectedByTrim={formData.newDisplacementCorrectedByTrim ?? 0}
            newDisplacementCorrectedByDensity={formData.newDisplacementCorrectedByDensity ?? 0}
            totalBallast={formData.totalBallast ?? 0}
            freeshWater={formData.freeshWater ?? 0}
            totalBunker={formData.totalBunker ?? 0}
            lightShip={formData.lightShip ?? 0}
            others={formData.others ?? 0}
            totalDeductibles={formData.totalDeductibles ?? 0}
              onValueChange={(field, value) => {
                setFormData(prev => ({
                  ...prev,
                  [field]: value,
                  // Calculer les moyennes lorsque les valeurs changent
                  ...(field.includes('Sup') || field.includes('Inf') ? {
                    displacement: Number(formData.displacementInf) + ((Number(formData.displacementSup) - Number(formData.displacementInf)) / (Number(formData.draftSup) - Number(formData.draftInf))) * (Number(formData.draftSup) - Number(formData.quarterMean)),
                    tpc: Number(formData.tpcInf) + ((Number(formData.tpcSup) - Number(formData.tpcInf)) / (Number(formData.draftSup) - Number(formData.draftInf))) * (Number(formData.draftSup) - Number(formData.quarterMean)),
                    lcf: Number(formData.lcfInf) + ((Number(formData.lcfSup) - Number(formData.lcfInf)) / (Number(formData.draftSup) - Number(formData.draftInf))) * (Number(formData.draftSup) - Number(formData.quarterMean)),
                    deltaMtc: Number(formData.mtcPlus50) - Number(formData.mtcMinus50) 
                  } : {})
                }));
              }}
            />
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ValeursFinal;