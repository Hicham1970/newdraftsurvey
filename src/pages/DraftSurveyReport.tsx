import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import draftSurveyReportService from "../services/draftSurveyReportServices";

interface FormData {
  // Vessel Information
  vessel: string;
  cargo: string;
  blWeight: number;
  blDate: Date;
  portLoading: string;
  portDischarging: string;

  // Ship Details
  flag: string;
  portRegistry: string;
  grossTonnage: number;
  netTonnage: number;
  lbp: number;
  loa: number;
  breadth: number;
  lightShip: number;
  numberOfHolds: number;
  numberOfBallastTks: number;
  summerDraft: number;
  summerDeadweight: number;

  // Survey Times
  vesselArrivedDate: Date;
  vesselArrivedTime: Date;
  vesselBerthedDate: Date;
  vesselBerthedTime: Date;
  unloadingCommencedDate: Date;
  unloadingCommencedTime: Date;
  unloadingCompletedDate: Date;
  unloadingCompletedTime: Date;
  initialSurveyCommencedDate: Date;
  initialSurveyCommencedTime: Date;
  initialSurveyCompletedDate: Date;
  initialSurveyCompletedTime: Date;
  finalSurveyCommencedDate: Date;
  finalSurveyCommencedTime: Date;
  finalSurveyCompletedDate: Date;
  finalSurveyCompletedTime: Date;

  // Drafts and Calculations
  // FORE
  forePortInitial: number;
  foreStbdInitial: number;
  foreMeanInitial: number;
  foreDistanceInitial: number;
  foreCorrectionInitial: number;
  foreCorrectedInitial: number;
  forePortFinal: number;
  foreStbdFinal: number;
  foreMeanFinal: number;
  foreDistanceFinal: number;
  foreCorrectionFinal: number;
  foreCorrectedFinal: number;
  // Aft
  aftPortInitial: number;
  aftStbdInitial: number;
  aftMeanInitial: number;
  aftDistanceInitial: number;
  aftCorrectionInitial: number;
  aftCorrectedInitial: number;
  aftPortFinal: number;
  aftStbdFinal: number;
  aftMeanFinal: number;
  aftDistanceFinal: number;
  aftCorrectionFinal: number;
  aftCorrectedFinal: number;

  // MID
  midPortInitial: number;
  midStbdInitial: number;
  midMeanInitial: number;
  midDistanceInitial: number;
  midCorrectionInitial: number;
  midCorrectedInitial: number;
  midPortFinal: number;
  midStbdFinal: number;
  midMeanFinal: number;
  midDistanceFinal: number;
  midCorrectionFinal: number;
  midCorrectedFinal: number;

  // Means
  meanForeAftInitial: number;
  meanOfMeanInitial: number;
  quarterMeanInitial: number;
  meanForeAftFinal: number;
  meanOfMeanFinal: number;
  quarterMeanFinal: number;

  // Displacement Calculations
  correspondingDisplacementInitial: number;
  trimCorrectionInitial: number;
  correctedDisplacementForTrimInitial: number;
  densityDockWaterInitial: number;
  correctedDisplacementForDensityInitial: number;
  deductiblesLiquidsInitial: number;
  netLightLoadedDisplacementInitial: number;

  correspondingDisplacementFinal: number;
  trimCorrectionFinal: number;
  correctedDisplacementForTrimFinal: number;
  densityDockWaterFinal: number;
  correctedDisplacementForDensityFinal: number;
  deductiblesLiquidsFinal: number;
  netLightLoadedDisplacementFinal: number;

  // Total Cargo
  totalCargoLoadedOnBoard: number;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
  background: "#000000",
  color: "#ffffff",
  overflowX: "auto",
  width: "100%",
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#ffff00",
    textAlign: "center",
  },
  "& .MuiInputLabel-root": {
    color: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#ffff00",
    },
  },
});

const DraftSurveyReport: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    // Initialize with values from the photo
    vessel: "DRINA S",
    cargo: "PHOSPHATE IN BULK",
    blWeight: 33000000,
    blDate: new Date("2024-08-10"),
    portLoading: "CASABLANCA",
    portDischarging: "ANTWERP",

    flag: "PANAMA",
    portRegistry: "PANAMA",
    grossTonnage: 23264.0,
    netTonnage: 12134.0,
    lbp: 176.0,
    loa: 179.97,
    breadth: 29.8,
    lightShip: 8287.0,
    numberOfHolds: 5,
    numberOfBallastTks: 16,
    summerDraft: 10.542,
    summerDeadweight: 38037.0,

    // Initialize dates from the photo
    vesselArrivedDate: new Date("2024-08-08"),
    vesselArrivedTime: new Date("2024-08-08T20:30:00"),
    vesselBerthedDate: new Date("2024-08-09"),
    vesselBerthedTime: new Date("2024-08-09T09:25:00"),
    unloadingCommencedDate: new Date("2024-08-09"),
    unloadingCommencedTime: new Date("2024-08-09T12:15:00"),
    unloadingCompletedDate: new Date("2024-08-10"),
    unloadingCompletedTime: new Date("2024-08-10T12:40:00"),
    initialSurveyCommencedDate: new Date("2024-08-09"),
    initialSurveyCommencedTime: new Date("2024-08-09T09:45:00"),
    initialSurveyCompletedDate: new Date("2024-08-09"),
    initialSurveyCompletedTime: new Date("2024-08-09T11:00:00"),
    finalSurveyCommencedDate: new Date("2024-08-10"),
    finalSurveyCommencedTime: new Date("2024-08-10T12:40:00"),
    finalSurveyCompletedDate: new Date("2024-08-10"),
    finalSurveyCompletedTime: new Date("2024-08-10T13:45:00"),

    // Initialize other required fields with default values
    forePortInitial: 3.98,
    foreStbdInitial: 3.55,
    foreMeanInitial: 3.77,
    foreDistanceInitial: 0.0,
    foreCorrectionInitial: 0.0,
    foreCorrectedInitial: 3.77,
    forePortFinal: 9.0,
    foreStbdFinal: 9.62,
    foreMeanFinal: 9.6,
    foreDistanceFinal: 5.8,
    foreCorrectionFinal: -0.36,
    foreCorrectedFinal: 9.64,

    aftPortInitial: 5.65,
    aftStbdInitial: 5.66,
    aftMeanInitial: 5.45,
    aftDistanceInitial: 0.0,
    aftCorrectionInitial: 5.45,
    aftCorrectedInitial: 5.85,
    aftPortFinal: 9.88,
    aftStbdFinal: 9.99,
    aftMeanFinal: 9.87,
    aftDistanceFinal: 0.0,
    aftCorrectionFinal: 1.33,
    aftCorrectedFinal: 9.9,

    midPortInitial: 4.82,
    midStbdInitial: 4.88,
    midMeanInitial: 4.85,
    midDistanceInitial: 0.0,
    midCorrectionInitial: 4.85,
    midCorrectedInitial: 4.85,
    midPortFinal: 9.68,
    midStbdFinal: 9.81,
    midMeanFinal: 9.74,
    midDistanceFinal: 0.0,
    midCorrectionFinal: 0.0,
    midCorrectedFinal: 9.74,

    meanForeAftInitial: 4.78,
    meanOfMeanInitial: 4.81,
    quarterMeanInitial: 4.83,
    meanForeAftFinal: 9.73,
    meanOfMeanFinal: 9.74,
    quarterMeanFinal: 9.74,

    correspondingDisplacementInitial: 20093.9,
    trimCorrectionInitial: -2.75,
    correctedDisplacementForTrimInitial: 19818.199,
    densityDockWaterInitial: 1.024,
    correctedDisplacementForDensityInitial: 19798.864,
    deductiblesLiquidsInitial: 11310.572,
    netLightLoadedDisplacementInitial: 8488.292,

    correspondingDisplacementFinal: 42463.76,
    trimCorrectionFinal: -35.2,
    correctedDisplacementForTrimFinal: 42428.56,
    densityDockWaterFinal: 1.024,
    correctedDisplacementForDensityFinal: 42387.166,
    deductiblesLiquidsFinal: 922.622,
    netLightLoadedDisplacementFinal: 41464.544,

    totalCargoLoadedOnBoard: 32976.252,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  console.log(formData);

  const handleSubmit = async () => {
    try {
      await draftSurveyReportService.createReport(formData);
      enqueueSnackbar(
        "Rapport d'enquête de tirant d'eau sauvegardé avec succès !",
        { variant: "success" }
      );
    } catch (error) {
      // Gestion des erreurs plus détaillée
      if (error instanceof Error) {
        // Vérification si l'erreur est une instance d'Error
        // Loguer l'erreur complète pour le débogage
        console.error("Erreur lors de la sauvegarde du rapport :", error);

        // Afficher un message plus utile à l'utilisateur
        let messageErreur =
          "Erreur lors de la sauvegarde du rapport. Veuillez réessayer.";
        if (error.message) {
          // Vérification si l'erreur a un message
          messageErreur = error.message; // Utiliser le message d'erreur si disponible
        }
        enqueueSnackbar(messageErreur, { variant: "error" });
      } else {
        // Gestion des erreurs non-Error (ex: réponse réseau inattendue)
        console.error(
          "Erreur inattendue lors de la sauvegarde du rapport :",
          error
        );
        enqueueSnackbar(
          "Une erreur inattendue s'est produite. Veuillez contacter l'administrateur.",
          { variant: "error" }
        );
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#ff0000", textAlign: "center" }}
              >
                DRAFT SURVEY REPORT
              </Typography>
            </StyledPaper>
          </Grid>

          {/* Vessel Information */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Vessel Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Vessel"
                    value={formData.vessel}
                    onChange={handleChange("vessel")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Cargo"
                    value={formData.cargo}
                    onChange={handleChange("cargo")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="BL Weight"
                    value={formData.blWeight}
                    onChange={handleChange("blWeight")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="BL Date"
                    value={formData.blDate}
                    onChange={handleChange("blDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Port Loading"
                    value={formData.portLoading}
                    onChange={handleChange("portLoading")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Port Discharging"
                    value={formData.portDischarging}
                    onChange={handleChange("portDischarging")}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Ship Details Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Ship Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Flag"
                    value={formData.flag}
                    onChange={handleChange("flag")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Port Registry"
                    value={formData.portRegistry}
                    onChange={handleChange("portRegistry")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Gross Tonnage"
                    value={formData.grossTonnage}
                    onChange={handleChange("grossTonnage")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Net Tonnage"
                    value={formData.netTonnage}
                    onChange={handleChange("netTonnage")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="LBP"
                    value={formData.lbp}
                    onChange={handleChange("lbp")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="LOA"
                    value={formData.loa}
                    onChange={handleChange("loa")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Breadth"
                    value={formData.breadth}
                    onChange={handleChange("breadth")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Light Ship"
                    value={formData.lightShip}
                    onChange={handleChange("lightShip")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Number of Holds"
                    value={formData.numberOfHolds}
                    onChange={handleChange("numberOfHolds")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Number of Ballast Tks"
                    value={formData.numberOfBallastTks}
                    onChange={handleChange("numberOfBallastTks")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Summer Draft"
                    value={formData.summerDraft}
                    onChange={handleChange("summerDraft")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Summer Deadweight"
                    value={formData.summerDeadweight}
                    onChange={handleChange("summerDeadweight")}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Survey Times Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Survey Times
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Vessel Arrived Date"
                    value={formData.vesselArrivedDate}
                    onChange={handleChange("vesselArrivedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Vessel Arrived Time"
                    value={formData.vesselArrivedTime}
                    onChange={handleChange("vesselArrivedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Vessel Berthed Date"
                    value={formData.vesselBerthedDate}
                    onChange={handleChange("vesselBerthedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Vessel Berthed Time"
                    value={formData.vesselBerthedTime}
                    onChange={handleChange("vesselBerthedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Unloading Commenced Date"
                    value={formData.unloadingCommencedDate}
                    onChange={handleChange("unloadingCommencedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Unloading Commenced Time"
                    value={formData.unloadingCommencedTime}
                    onChange={handleChange("unloadingCommencedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Unloading Completed Date"
                    value={formData.unloadingCompletedDate}
                    onChange={handleChange("unloadingCompletedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Unloading Completed Time"
                    value={formData.unloadingCompletedTime}
                    onChange={handleChange("unloadingCompletedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Initial Survey Commenced Date"
                    value={formData.initialSurveyCommencedDate}
                    onChange={handleChange("initialSurveyCommencedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Initial Survey Commenced Time"
                    value={formData.initialSurveyCommencedTime}
                    onChange={handleChange("initialSurveyCommencedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Initial Survey Completed Date"
                    value={formData.initialSurveyCompletedDate}
                    onChange={handleChange("initialSurveyCompletedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Initial Survey Completed Time"
                    value={formData.initialSurveyCompletedTime}
                    onChange={handleChange("initialSurveyCompletedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Final Survey Commenced Date"
                    value={formData.finalSurveyCommencedDate}
                    onChange={handleChange("finalSurveyCommencedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Final Survey Commenced Time"
                    value={formData.finalSurveyCommencedTime}
                    onChange={handleChange("finalSurveyCommencedTime")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Final Survey Completed Date"
                    value={formData.finalSurveyCompletedDate}
                    onChange={handleChange("finalSurveyCompletedDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Final Survey Completed Time"
                    value={formData.finalSurveyCompletedTime}
                    onChange={handleChange("finalSurveyCompletedTime")}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Drafts and Calculations Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Drafts and Calculations
              </Typography>
              <Grid container spacing={3}>
                {/* Initial Column */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#ffff00" }}
                  >
                    Initial Survey
                  </Typography>
                  {/* FORE Initial */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff" }}
                  >
                    FORE
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Port"
                        value={formData.forePortInitial}
                        onChange={handleChange("forePortInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.foreStbdInitial}
                        onChange={handleChange("foreStbdInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        value={formData.foreMeanInitial}
                        onChange={handleChange("foreMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Distance"
                        value={formData.foreDistanceInitial}
                        onChange={handleChange("foreDistanceInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Correction"
                        value={formData.foreCorrectionInitial}
                        onChange={handleChange("foreCorrectionInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Corrected"
                        value={formData.foreCorrectedInitial}
                        onChange={handleChange("foreCorrectedInitial")}
                      />
                    </Grid>
                  </Grid>

                  {/* AFT Initial */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff", mt: 2 }}
                  >
                    AFT
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Port"
                        value={formData.aftPortInitial}
                        onChange={handleChange("aftPortInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.aftStbdInitial}
                        onChange={handleChange("aftStbdInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        value={formData.aftMeanInitial}
                        onChange={handleChange("aftMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Distance"
                        value={formData.aftDistanceInitial}
                        onChange={handleChange("aftDistanceInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Correction"
                        value={formData.aftCorrectionInitial}
                        onChange={handleChange("aftCorrectionInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Corrected"
                        value={formData.aftCorrectedInitial}
                        onChange={handleChange("aftCorrectedInitial")}
                      />
                    </Grid>
                  </Grid>

                  {/* MID Initial */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff", mt: 2 }}
                  >
                    MID
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Port"
                        value={formData.midPortInitial}
                        onChange={handleChange("midPortInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.midStbdInitial}
                        onChange={handleChange("midStbdInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        value={formData.midMeanInitial}
                        onChange={handleChange("midMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Distance"
                        value={formData.midDistanceInitial}
                        onChange={handleChange("midDistanceInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Correction"
                        value={formData.midCorrectionInitial}
                        onChange={handleChange("midCorrectionInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Corrected"
                        value={formData.midCorrectedInitial}
                        onChange={handleChange("midCorrectedInitial")}
                      />
                    </Grid>
                  </Grid>

                  {/* Mean Calculations Initial */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff", mt: 2 }}
                  >
                    Mean Calculations
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean Fore/Aft"
                        value={formData.meanForeAftInitial}
                        onChange={handleChange("meanForeAftInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean of Mean"
                        value={formData.meanOfMeanInitial}
                        onChange={handleChange("meanOfMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Quarter Mean"
                        value={formData.quarterMeanInitial}
                        onChange={handleChange("quarterMeanInitial")}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Final Column */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#ffff00" }}
                  >
                    Final Survey
                  </Typography>
                  {/* FORE Final */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff" }}
                  >
                    FORE
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Port"
                        value={formData.forePortFinal}
                        onChange={handleChange("forePortFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.foreStbdFinal}
                        onChange={handleChange("foreStbdFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        value={formData.foreMeanFinal}
                        onChange={handleChange("foreMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Distance"
                        value={formData.foreDistanceFinal}
                        onChange={handleChange("foreDistanceFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Correction"
                        value={formData.foreCorrectionFinal}
                        onChange={handleChange("foreCorrectionFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Corrected"
                        value={formData.foreCorrectedFinal}
                        onChange={handleChange("foreCorrectedFinal")}
                      />
                    </Grid>
                  </Grid>

                  {/* AFT Final */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff", mt: 2 }}
                  >
                    AFT
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Port"
                        value={formData.aftPortFinal}
                        onChange={handleChange("aftPortFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.aftStbdFinal}
                        onChange={handleChange("aftStbdFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        value={formData.aftMeanFinal}
                        onChange={handleChange("aftMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Distance"
                        value={formData.aftDistanceFinal}
                        onChange={handleChange("aftDistanceFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Correction"
                        value={formData.aftCorrectionFinal}
                        onChange={handleChange("aftCorrectionFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Corrected"
                        value={formData.aftCorrectedFinal}
                        onChange={handleChange("aftCorrectedFinal")}
                      />
                    </Grid>
                  </Grid>

                  {/* MID Final */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff", mt: 2 }}
                  >
                    MID
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Port"
                        value={formData.midPortFinal}
                        onChange={handleChange("midPortFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.midStbdFinal}
                        onChange={handleChange("midStbdFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        value={formData.midMeanFinal}
                        onChange={handleChange("midMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Distance"
                        value={formData.midDistanceFinal}
                        onChange={handleChange("midDistanceFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Correction"
                        value={formData.midCorrectionFinal}
                        onChange={handleChange("midCorrectionFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Corrected"
                        value={formData.midCorrectedFinal}
                        onChange={handleChange("midCorrectedFinal")}
                      />
                    </Grid>
                  </Grid>

                  {/* Mean Calculations Final */}
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ color: "#ffffff", mt: 2 }}
                  >
                    Mean Calculations
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean Fore/Aft"
                        value={formData.meanForeAftFinal}
                        onChange={handleChange("meanForeAftFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean of Mean"
                        value={formData.meanOfMeanFinal}
                        onChange={handleChange("meanOfMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Quarter Mean"
                        value={formData.quarterMeanFinal}
                        onChange={handleChange("quarterMeanFinal")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Displacement Calculations Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Displacement Calculations
              </Typography>
              <Grid container spacing={2}>
                {/* Initial Values */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#ffff00", mb: 2 }}
                  >
                    Initial Survey
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corresponding Displacement"
                        value={formData.correspondingDisplacementInitial}
                        onChange={handleChange(
                          "correspondingDisplacementInitial"
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Trim Correction"
                        value={formData.trimCorrectionInitial}
                        onChange={handleChange("trimCorrectionInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Trim"
                        value={formData.correctedDisplacementForTrimInitial}
                        onChange={handleChange(
                          "correctedDisplacementForTrimInitial"
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Density of Dock Water"
                        value={formData.densityDockWaterInitial}
                        onChange={handleChange("densityDockWaterInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Density"
                        value={formData.correctedDisplacementForDensityInitial}
                        onChange={handleChange(
                          "correctedDisplacementForDensityInitial"
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Deductibles Liquids"
                        value={formData.deductiblesLiquidsInitial}
                        onChange={handleChange("deductiblesLiquidsInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Net Light/Loaded Displacement"
                        value={formData.netLightLoadedDisplacementInitial}
                        onChange={handleChange(
                          "netLightLoadedDisplacementInitial"
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Final Values */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#ffff00", mb: 2 }}
                  >
                    Final Survey
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corresponding Displacement"
                        value={formData.correspondingDisplacementFinal}
                        onChange={handleChange(
                          "correspondingDisplacementFinal"
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Trim Correction"
                        value={formData.trimCorrectionFinal}
                        onChange={handleChange("trimCorrectionFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Trim"
                        value={formData.correctedDisplacementForTrimFinal}
                        onChange={handleChange(
                          "correctedDisplacementForTrimFinal"
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Density of Dock Water"
                        value={formData.densityDockWaterFinal}
                        onChange={handleChange("densityDockWaterFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Density"
                        value={formData.correctedDisplacementForDensityFinal}
                        onChange={handleChange(
                          "correctedDisplacementForDensityFinal"
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Deductibles Liquids"
                        value={formData.deductiblesLiquidsFinal}
                        onChange={handleChange("deductiblesLiquidsFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Net Light/Loaded Displacement"
                        value={formData.netLightLoadedDisplacementFinal}
                        onChange={handleChange(
                          "netLightLoadedDisplacementFinal"
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Total Cargo Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Total Cargo
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Total Cargo Loaded on Board"
                    value={formData.totalCargoLoadedOnBoard}
                    onChange={handleChange("totalCargoLoadedOnBoard")}
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: "1.2rem", fontWeight: "bold" },
                    }}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>

        {/* Add Submit Button at the bottom of the form */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            sx={{
              minWidth: 200,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            Save Draft Survey Report
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DraftSurveyReport;
