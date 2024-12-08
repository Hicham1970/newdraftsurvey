import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { vesselService } from '../services/vesselService';

interface FormData {
  nationality: string;
  portOfRegistry: string;
  vessel: string;
  cargo: string;
  port: string;
  portOfLoading: string;
  portOfDischarge: string;
  blWeight: string;
  blDate: Date ;
  vesselArrived: Date ;
  vesselBerthed: Date ;
  initialSurveyCommenced: Date ;
  initialSurveyCompleted: Date ;
  operationCommenced: Date ;
  operationCompleted: Date ;
  finalSurveyCommenced: Date ;
  finalSurveyCompleted: Date ;
}

interface FormErrors {
  [key: string]: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
  background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Infos: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nationality: '',
    portOfRegistry: '',
    vessel: '',
    cargo: '',
    port: '',
    portOfLoading: '',
    portOfDischarge: '',
    blWeight: '',
    blDate: new Date(),
    vesselArrived: new Date(),
    vesselBerthed: new Date(),
    initialSurveyCommenced: new Date(),
    initialSurveyCompleted: new Date(),
    operationCommenced: new Date(),
    operationCompleted: new Date(),
    finalSurveyCommenced: new Date(),
    finalSurveyCompleted: new Date(),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (field: keyof FormData) => (value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  const validateField = (field: keyof FormData, value: any) => {
    let newErrors = { ...errors };

    switch (field) {
      case 'blWeight':
        if (!value.trim()) {
          newErrors[field] = 'BL Weight is required';
        } else {
          // Validation du format du BL Weight
          const normalizedValue = value.replace(/\s/g, '').replace(',', '.');
          if (!/^\d+(\.\d{1,3})?$/.test(normalizedValue)) {
            newErrors[field] = 'BL Weight must be a valid number with up to 3 decimal places. Spaces are allowed as thousand separators.';
          } else {
            delete newErrors[field];
          }
        }
        break;
      case 'vessel':
      case 'nationality':
      case 'portOfRegistry':
        if (!value || value.toString().trim() === '') {
          newErrors[field] = 'This field is required';
        } else {
          delete newErrors[field];
        }
        break;
      default:
        if ((field.includes('Survey') || field.includes('Operation')) && value instanceof Date) {
          if (!value || isNaN(value.getTime())) {
            newErrors[field] = 'Invalid date';
          } else {
            delete newErrors[field];
          }
        }
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validation des champs requis
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.portOfRegistry.trim()) newErrors.portOfRegistry = 'Port of Registry is required';
    if (!formData.vessel.trim()) newErrors.vessel = 'Vessel name is required';
    if (!formData.cargo.trim()) newErrors.cargo = 'Cargo is required';
    if (!formData.port.trim()) newErrors.port = 'Port is required';
    if (!formData.portOfLoading.trim()) newErrors.portOfLoading = 'Port of Loading is required';
    if (!formData.portOfDischarge.trim()) newErrors.portOfDischarge = 'Port of Discharge is required';
    if (!formData.blWeight.trim()) {
      newErrors.blWeight = 'BL Weight is required';
    } else {
      // Validation du format du BL Weight
      const normalizedValue = formData.blWeight.replace(/\s/g, '').replace(',', '.');
      if (!/^\d+(\.\d{1,3})?$/.test(normalizedValue)) {
        newErrors.blWeight = 'BL Weight must be a valid number with up to 3 decimal places. Spaces are allowed as thousand separators.';
      }
    }
    
    // Validation des dates
    if (!formData.blDate) newErrors.blDate = 'BL Date is required';
    if (!formData.vesselArrived) newErrors.vesselArrived = 'Vessel Arrived date is required';
    if (!formData.vesselBerthed) newErrors.vesselBerthed = 'Vessel Berthed date is required';
    if (!formData.initialSurveyCommenced) newErrors.initialSurveyCommenced = 'Initial Survey Commenced date is required';
    if (!formData.initialSurveyCompleted) newErrors.initialSurveyCompleted = 'Initial Survey Completed date is required';
    if (!formData.operationCommenced) newErrors.operationCommenced = 'Operation Commenced date is required';
    if (!formData.operationCompleted) newErrors.operationCompleted = 'Operation Completed date is required';
    if (!formData.finalSurveyCommenced) newErrors.finalSurveyCommenced = 'Final Survey Commenced date is required';
    if (!formData.finalSurveyCompleted) newErrors.finalSurveyCompleted = 'Final Survey Completed date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields correctly',
        severity: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await vesselService.createVessel(formData);
      setSnackbar({
        open: true,
        message: 'Vessel information saved successfully!',
        severity: 'success'
      });
      // Optionnel : réinitialiser le formulaire après succès
      setFormData({
        nationality: '',
        portOfRegistry: '',
        vessel: '',
        cargo: '',
        port: '',
        portOfLoading: '',
        portOfDischarge: '',
        blWeight: '',
        blDate: new Date(),
        vesselArrived: new Date(),
        vesselBerthed: new Date(),
        initialSurveyCommenced: new Date(),
        initialSurveyCompleted: new Date(),
        operationCommenced: new Date(),
        operationCompleted: new Date(),
        finalSurveyCommenced: new Date(),
        finalSurveyCompleted: new Date(),
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'An error occurred while saving the data',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column - Vessel Information */}
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <RocketLaunchIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Vessel Information
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Nationality"
                      variant="outlined"
                      value={formData.nationality}
                      onChange={(e) => handleChange('nationality')(e.target.value)}
                      error={!!errors.nationality}
                      helperText={errors.nationality}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Port of Registry"
                      variant="outlined"
                      value={formData.portOfRegistry}
                      onChange={(e) => handleChange('portOfRegistry')(e.target.value)}
                      error={!!errors.portOfRegistry}
                      helperText={errors.portOfRegistry}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Vessel"
                      variant="outlined"
                      value={formData.vessel}
                      onChange={(e) => handleChange('vessel')(e.target.value)}
                      error={!!errors.vessel}
                      helperText={errors.vessel}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Cargo"
                      variant="outlined"
                      value={formData.cargo}
                      onChange={(e) => handleChange('cargo')(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Port"
                      variant="outlined"
                      value={formData.port}
                      onChange={(e) => handleChange('port')(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Port of Loading"
                      variant="outlined"
                      value={formData.portOfLoading}
                      onChange={(e) => handleChange('portOfLoading')(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Port of Discharge"
                      variant="outlined"
                      value={formData.portOfDischarge}
                      onChange={(e) => handleChange('portOfDischarge')(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="BL Weight"
                      variant="outlined"
                      value={formData.blWeight}
                      onChange={(e) => handleChange('blWeight')(e.target.value)}
                      error={!!errors.blWeight}
                      helperText={errors.blWeight}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="BL Date"
                      value={formData.blDate}
                      onChange={(value) => handleChange('blDate')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.blDate,
                          helperText: errors.blDate
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </StyledPaper>
            </Grid>

            {/* Right Column - Operation Timing */}
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccessAlarmIcon sx={{ fontSize: 40, color: '#ff0000', mr: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Operation Timing
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Vessel Arrived"
                      value={formData.vesselArrived}
                      onChange={(value) => handleChange('vesselArrived')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.vesselArrived,
                          helperText: errors.vesselArrived
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Vessel Berthed"
                      value={formData.vesselBerthed}
                      onChange={(value) => handleChange('vesselBerthed')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.vesselBerthed,
                          helperText: errors.vesselBerthed
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Initial Survey Commenced"
                      value={formData.initialSurveyCommenced}
                      onChange={(value) => handleChange('initialSurveyCommenced')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.initialSurveyCommenced,
                          helperText: errors.initialSurveyCommenced
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Initial Survey Completed"
                      value={formData.initialSurveyCompleted}
                      onChange={(value) => handleChange('initialSurveyCompleted')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.initialSurveyCompleted,
                          helperText: errors.initialSurveyCompleted
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Operation Commenced"
                      value={formData.operationCommenced}
                      onChange={(value) => handleChange('operationCommenced')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.operationCommenced,
                          helperText: errors.operationCommenced
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Operation Completed"
                      value={formData.operationCompleted}
                      onChange={(value) => handleChange('operationCompleted')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.operationCompleted,
                          helperText: errors.operationCompleted
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Final Survey Commenced"
                      value={formData.finalSurveyCommenced}
                      onChange={(value) => handleChange('finalSurveyCommenced')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.finalSurveyCommenced,
                          helperText: errors.finalSurveyCommenced
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      label="Final Survey Completed"
                      value={formData.finalSurveyCompleted}
                      onChange={(value) => handleChange('finalSurveyCompleted')(value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.finalSurveyCompleted,
                          helperText: errors.finalSurveyCompleted
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </StyledPaper>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                  sx={{
                    minWidth: 200,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #FF0000 30%, #FF4081 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF4081 30%, #FF0000 90%)',
                    }
                  }}
                >
                  {isSubmitting ? 'Saving...' : 'Save Vessel Info'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar pour les notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default Infos;