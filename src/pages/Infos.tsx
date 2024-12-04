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

interface FormData {
  nationality: string;
  portOfRegistry: string;
  vessel: string;
  cargo: string;
  port: string;
  portOfLoading: string;
  portOfDischarge: string;
  blWeight: string;
  blDate: Date | null;
  vesselArrived: Date | null;
  vesselBerthed: Date | null;
  initialSurveyCommenced: Date | null;
  initialSurveyCompleted: Date | null;
  operationCommenced: Date | null;
  operationCompleted: Date | null;
  finalSurveyCommenced: Date | null;
  finalSurveyCompleted: Date | null;
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
    nationality: 'PANAMA',
    portOfRegistry: 'PANAMA',
    vessel: 'DRINA S',
    cargo: 'PHOSPHATE IN BULK',
    port: 'CASABLANCA',
    portOfLoading: 'CASABLANCA',
    portOfDischarge: 'ANTWERP',
    blWeight: '33 000,000',
    blDate: new Date('2024-08-10'),
    vesselArrived: new Date('2024-08-08T20:30'),
    vesselBerthed: new Date('2024-08-09T09:25'),
    initialSurveyCommenced: new Date('2024-08-09T09:45'),
    initialSurveyCompleted: new Date('2024-08-09T11:00'),
    operationCommenced: new Date('2024-08-09T12:15'),
    operationCompleted: new Date('2024-08-10T12:40'),
    finalSurveyCommenced: new Date('2024-08-10T12:40'),
    finalSurveyCompleted: new Date('2024-08-10T13:45'),
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
        if (!/^\d{1,3}(,\d{3})*(\.\d+)?$/.test(value.toString().replace(/\s/g, ''))) {
          newErrors[field] = 'Invalid weight format';
        } else {
          delete newErrors[field];
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column - Vessel Information */}
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Typography variant="h5" gutterBottom>
                  Vessel Information
                </Typography>
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
                <Typography variant="h5" gutterBottom>
                  Operation Timing
                </Typography>
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
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Infos;