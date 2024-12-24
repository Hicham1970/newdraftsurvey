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
// import CalculateValues from '../fonctions/Fonction1';
import Displacement from "./Displacement";

interface DraftSurveyFormData {
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
  keelCorrectionInitial: number;
  keelCorrectionFinal: number;
  // Trim
  trimObservedInitial: number;
  trimObservedFinal: number;
  trimCorrectedInitial: number;
  trimCorrectedFinal: number;

  // Means
  meanForeAftInitial: number;
  meanOfMeanInitial: number;
  quarterMeanInitial: number;
  meanForeAftFinal: number;
  meanOfMeanFinal: number;
  quarterMeanFinal: number;

  // Displacement Calculations
  correspondingDisplInitial: number;
  trimCorrectionInitial: number;
  correctedDisplacementForTrimInitial: number;
  densityDockWaterInitial: number;
  correctedDisplacementForDensityInitial: number;
  deductiblesLiquidsInitial: number;
  netLightLoadedDisplacementInitial: number;

  correspondingDisplFinal: number;
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
  const { enqueueSnackbar } = useSnackbar(); // Utilisez useSnackbar pour obtenir enqueueSnackbar
  const [formData, setFormData] = useState<DraftSurveyFormData>({
    vessel: "",
    cargo: "",
    blWeight: 0,
    blDate: new Date(),
    portLoading: "",
    portDischarging: "",

    flag: "",
    portRegistry: "",
    grossTonnage: 0,
    netTonnage: 0,
    lbp: 0,
    loa: 0,
    breadth: 0,
    lightShip: 0,
    numberOfHolds: 0,
    numberOfBallastTks: 0,
    summerDraft: 0,
    summerDeadweight: 0,

    // Initialize dates from the photo
    vesselArrivedDate: new Date(),
    vesselArrivedTime: new Date(),
    vesselBerthedDate: new Date(),
    vesselBerthedTime: new Date(),
    unloadingCommencedDate: new Date(),
    unloadingCommencedTime: new Date(),
    unloadingCompletedDate: new Date(),
    unloadingCompletedTime: new Date(),
    initialSurveyCommencedDate: new Date(),
    initialSurveyCommencedTime: new Date(),
    initialSurveyCompletedDate: new Date(),
    initialSurveyCompletedTime: new Date(),
    finalSurveyCommencedDate: new Date(),
    finalSurveyCommencedTime: new Date(),
    finalSurveyCompletedDate: new Date(),
    finalSurveyCompletedTime: new Date(),

    // Initialize other required fields with default values
    // Initial Measurements
    forePortInitial: 0,
    foreStbdInitial: 0,
    foreMeanInitial: 0,
    foreDistanceInitial: 0,
    foreCorrectionInitial: 0,
    foreCorrectedInitial: 0,
    forePortFinal: 0,
    foreStbdFinal: 0,
    foreMeanFinal: 0,
    foreDistanceFinal: 0,
    foreCorrectionFinal: 0,
    foreCorrectedFinal: 0,

    // Aft Measurements
    aftPortInitial: 0,
    aftStbdInitial: 0,
    aftMeanInitial: 0,
    aftDistanceInitial: 0,
    aftCorrectionInitial: 0,
    aftCorrectedInitial: 0,
    aftPortFinal: 0,
    aftStbdFinal: 0,
    aftMeanFinal: 0,
    aftDistanceFinal: 0,
    aftCorrectionFinal: 0,
    aftCorrectedFinal: 0,

    // Mid Measurements
    midPortInitial: 0,
    midStbdInitial: 0,
    midMeanInitial: 0,
    midDistanceInitial: 0,
    midCorrectionInitial: 0,
    midCorrectedInitial: 0,
    midPortFinal: 0,
    midStbdFinal: 0,
    midMeanFinal: 0,
    midDistanceFinal: 0,
    midCorrectionFinal: 0,
    midCorrectedFinal: 0,

    // Keel Corrections
    keelCorrectionInitial: 0,
    keelCorrectionFinal: 0,

    //TRIM
    trimObservedInitial: 0,
    trimObservedFinal: 0,
    trimCorrectedInitial: 0,
    trimCorrectedFinal: 0,

    // Means
    meanForeAftInitial: 0,
    meanOfMeanInitial: 0,
    quarterMeanInitial: 0,
    meanForeAftFinal: 0,
    meanOfMeanFinal: 0,
    quarterMeanFinal: 0,

    // Displacement Calculations
    correspondingDisplInitial: 0,
    trimCorrectionInitial: 0,
    correctedDisplacementForTrimInitial: 0,
    densityDockWaterInitial: 0,
    correctedDisplacementForDensityInitial: 0,
    deductiblesLiquidsInitial: 0,
    netLightLoadedDisplacementInitial: 0,

    correspondingDisplFinal: 0,
    trimCorrectionFinal: 0,
    correctedDisplacementForTrimFinal: 0,
    densityDockWaterFinal: 0,
    correctedDisplacementForDensityFinal: 0,
    deductiblesLiquidsFinal: 0,
    netLightLoadedDisplacementFinal: 0,

    // Total Cargo
    totalCargoLoadedOnBoard: 0,
  });

  const calculatedValues = calculateValues(formData);

  // Fonction Calculer les Valeurs:
  function calculateValues(formData: DraftSurveyFormData) {
    // Log the port and starboard initial values before calculating means
    console.log("Fore Port Initial:", formData.forePortInitial);
    console.log("Fore Stbd Initial:", formData.foreStbdInitial);
    console.log("Aft Port Initial:", formData.aftPortInitial);
    console.log("Aft Stbd Initial:", formData.aftStbdInitial);

    // Calculate mean values with validation
    const aftMeanInitial =
      (Number(formData.aftPortInitial) + Number(formData.aftStbdInitial)) / 2;
    const foreMeanInitial =
      (Number(formData.forePortInitial) + Number(formData.foreStbdInitial)) / 2;
    const midMeanInitial =
      (Number(formData.midPortInitial) + Number(formData.midStbdInitial)) / 2;
    // Log the calculated means
    console.log("Aft Mean Initial:", aftMeanInitial);
    console.log("Fore Mean Initial:", foreMeanInitial);
    console.log("Mid Mean Initial :", midMeanInitial);

    const calculatedValues: {
      lbmInitial: number;
      lbmFinal: number;
      foreCorrectedInitial: number;
      aftCorrectedInitial: number;
      midCorrectedInitial: number;
      foreCorrectedFinal: number;
      aftCorrectedFinal: number;
      midCorrectedFinal: number;
      aftMeanInitial: number;
      foreMeanInitial: number;
      aftMeanFinal: number;
      foreMeanFinal: number;
      trimObservedInitial: string;
      trimObservedFinal: string;
      meanForeAftInitial: number;
      meanOfMeanInitial: number;
      quarterMeanInitial: number;
      meanForeAftFinal: number;
      meanOfMeanFinal: number;
      quarterMeanFinal: number;
      correctedDisplacementForTrimInitial: number;
      correctedDisplacementForTrimFinal: number;
    } = {
      lbmInitial: 0,
      lbmFinal: 0,
      foreCorrectedInitial: 0,
      aftCorrectedInitial: 0,
      midCorrectedInitial: 0,
      foreCorrectedFinal: 0,
      aftCorrectedFinal: 0,
      midCorrectedFinal: 0,
      // Calculate mean values first
      aftMeanInitial: aftMeanInitial,
      foreMeanInitial: foreMeanInitial,
      aftMeanFinal:
        (Number(formData.aftPortFinal) + Number(formData.aftStbdFinal)) / 2,
      foreMeanFinal:
        (Number(formData.forePortFinal) + Number(formData.foreStbdFinal)) / 2,
      // Now calculate trims
      trimObservedInitial: (
        Number(aftMeanInitial) - Number(foreMeanInitial)
      ).toFixed(3),
      trimObservedFinal: (
        (Number(formData.aftPortFinal) + Number(formData.aftStbdFinal)) / 2 -
        (Number(formData.forePortFinal) + Number(formData.foreStbdFinal)) / 2
      ).toFixed(3),
      meanForeAftInitial: 0,
      meanOfMeanInitial: 0,
      quarterMeanInitial: 0,
      meanForeAftFinal: 0,
      meanOfMeanFinal: 0,
      quarterMeanFinal: 0,
      correctedDisplacementForTrimInitial: 0,
      correctedDisplacementForTrimFinal: 0,
    };

    const calculateLBM = (
      foreDistance: number,
      aftDistance: number
    ): number => {
      let lbm = Number(formData.lbp);
      if (isNaN(foreDistance) || isNaN(aftDistance)) {
        console.error("Invalid distances:", foreDistance, aftDistance);
        return NaN;
      }
      if (foreDistance < 0 && aftDistance > 0) {
        lbm -= foreDistance + aftDistance;
      } else if (foreDistance > 0 && aftDistance < 0) {
        lbm += foreDistance + aftDistance;
      } else if (foreDistance > 0 && aftDistance > 0) {
        lbm -= foreDistance + aftDistance;
      } else if (foreDistance < 0 && aftDistance < 0) {
        lbm += foreDistance + aftDistance;
      }
      return lbm;
    };

    // Add validation for formData fields used in calculations
    if (
      isNaN(formData.foreDistanceInitial) ||
      isNaN(formData.aftDistanceInitial)
    ) {
      console.error(
        "Invalid initial distances:",
        formData.foreDistanceInitial,
        formData.aftDistanceInitial
      );
      calculatedValues.lbmInitial = NaN;
    } else {
      calculatedValues.lbmInitial = calculateLBM(
        formData.foreDistanceInitial,
        formData.aftDistanceInitial
      );
    }

    if (isNaN(formData.foreDistanceFinal) || isNaN(formData.aftDistanceFinal)) {
      console.error(
        "Invalid final distances:",
        formData.foreDistanceFinal,
        formData.aftDistanceFinal
      );
      calculatedValues.lbmFinal = NaN;
    } else {
      calculatedValues.lbmFinal = calculateLBM(
        formData.foreDistanceFinal,
        formData.aftDistanceFinal
      );
    }

    // Calcul des valeurs corrigées
    // Initial
    calculatedValues.foreCorrectedInitial =
      foreMeanInitial +
      (Number(calculatedValues.trimObservedInitial) *
        formData.foreDistanceInitial) /
        calculatedValues.lbmInitial;
    calculatedValues.aftCorrectedInitial =
      aftMeanInitial +
      (Number(calculatedValues.trimObservedInitial) *
        formData.aftDistanceInitial) /
        calculatedValues.lbmInitial;
    calculatedValues.midCorrectedInitial =
      midMeanInitial +
      (Number(calculatedValues.trimObservedInitial) *
        formData.midDistanceInitial) /
        calculatedValues.lbmInitial;

    // Final:

    const foreMeanFinal =
      (Number(formData.forePortFinal) + Number(formData.foreStbdFinal)) / 2;
    const aftMeanFinal =
      (Number(formData.aftPortFinal) + Number(formData.aftStbdFinal)) / 2;
    const midMeanFinal =
      (Number(formData.midPortFinal) + Number(formData.midStbdFinal)) / 2;

    console.log("Trim Observed Final:", calculatedValues.trimObservedFinal);
    console.log("LBM Final:", calculatedValues.lbmFinal);
    console.log("Fore Distance Final:", formData.foreDistanceFinal);
    console.log("Aft Distance Final:", formData.aftDistanceFinal);
    console.log("Mid Distance Final:", formData.midDistanceFinal);
    console.log("Calcul des Drafts Corrigés :");
    console.log("Fore Mean Final:", foreMeanFinal);
    console.log("Aft Mean Final:", aftMeanFinal);
    console.log("Mid Mean Final:", midMeanFinal);
    console.log("Trim Observed Final:", calculatedValues.trimObservedFinal);
    console.log("LBM Final:", calculatedValues.lbmFinal);

    calculatedValues.foreCorrectedFinal =
      foreMeanFinal +
      (Number(calculatedValues.trimObservedFinal) *
        Number(formData.foreDistanceFinal)) /
        calculatedValues.lbmFinal;

    // Check if lbmFinal is zero to prevent division by zero
    if (calculatedValues.lbmFinal === 0) {
      console.error(
        "Error: lbmFinal is zero, cannot calculate aftCorrectedFinal."
      );
      calculatedValues.aftCorrectedFinal = 0; // Set to 0 or another appropriate default value
    } else {
      calculatedValues.aftCorrectedFinal =
        aftMeanFinal +
        (Number(calculatedValues.trimObservedFinal) *
          formData.aftDistanceFinal) /
          calculatedValues.lbmFinal;
    }

    calculatedValues.midCorrectedFinal =
      midMeanFinal +
      (Number(calculatedValues.trimObservedFinal) * formData.midDistanceFinal) /
        calculatedValues.lbmFinal;
    console.log(
      "foreCorrectedInitial :",
      calculatedValues.foreCorrectedInitial
    );
    console.log("aftCorrectedInitial :", calculatedValues.aftCorrectedInitial);
    console.log("midCorrectedInitial :", calculatedValues.midCorrectedInitial);
    console.log("foreCorrectedFinal :", calculatedValues.foreCorrectedFinal);
    console.log("aftCorrectedFinal :", calculatedValues.aftCorrectedFinal);
    console.log("midCorrectedFinal :", calculatedValues.midCorrectedFinal);
    // Calcul Du Mean ForAft Draft Initial:

    const meanForeAftInitial =
      (Number(calculatedValues.foreCorrectedInitial) +
        Number(calculatedValues.aftCorrectedInitial)) /
      2;
    const meanOfMeanInitial =
      (Number(meanForeAftInitial) +
        Number(calculatedValues.midCorrectedInitial)) /
      2;

    const quarterMeanInitial =
      (Number(meanOfMeanInitial) +
        Number(calculatedValues.midCorrectedInitial)) /
        2 +
      Number(formData.keelCorrectionInitial);

    calculatedValues.meanForeAftInitial = Number(meanForeAftInitial);
    calculatedValues.meanOfMeanInitial = Number(meanOfMeanInitial);
    calculatedValues.quarterMeanInitial = Number(quarterMeanInitial);

    // Calcul Du Mean ForAft Draft Final:

    const meanForeAftFinal =
      (Number(calculatedValues.foreCorrectedFinal) +
        Number(calculatedValues.aftCorrectedFinal)) /
      2;
    const meanOfMeanFinal =
      (Number(meanForeAftFinal) + Number(calculatedValues.midCorrectedFinal)) /
      2;

    const quarterMeanFinal =
      (Number(meanOfMeanFinal) + Number(calculatedValues.midCorrectedFinal)) /
        2 +
      Number(formData.keelCorrectionFinal);

    calculatedValues.meanForeAftFinal = Number(meanForeAftFinal);
    calculatedValues.meanOfMeanFinal = Number(meanOfMeanFinal);
    calculatedValues.quarterMeanFinal = Number(quarterMeanFinal);

    console.log(calculatedValues.meanForeAftInitial);
    console.log(calculatedValues.meanOfMeanInitial);
    console.log(calculatedValues.quarterMeanInitial);

    // Calcul du Trim Correction:
    const trimObservedInitial = (
      Number(aftMeanInitial) - Number(foreMeanInitial)
    ).toFixed(3);
    const trimObservedFinal = (
      Number(aftMeanFinal) - Number(foreMeanFinal)
    ).toFixed(3);

    calculatedValues.trimObservedInitial = trimObservedInitial;
    calculatedValues.trimObservedFinal = trimObservedFinal;

    // Calcul du Corrected Displacement For The QuarterMeans:
    // Initial  :La valeur du Displacement doit être retenu du composant ValeursInitials.tsx

    const calculateDisplacement = () => {
      // Logique pour calculer le déplacement initial et final
      const correspondingDisplInitial = formData.correspondingDisplInitial; // Exemple
      const correspondingDisplFinal = formData.correspondingDisplFinal; // Exemple

      return { correspondingDisplInitial, correspondingDisplFinal };
    };

    const { correspondingDisplInitial, correspondingDisplFinal } =
      calculateDisplacement();

    // Retourner les valeurs calculées
    console.log(calculatedValues);
    return calculatedValues;
  }

  const handleChange =
    (field: keyof DraftSurveyFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // Vérifier si la valeur est un nombre valide ou vide
      const isValidNumber = /^(\d+(\.\d{0,2})?|\.\d{1,2})?$/.test(value);

      if (isValidNumber || value === "") {
        setFormData((prev) => ({
          ...prev,
          [field]: value === "" ? "" : parseFloat(value), // Convertir en nombre si ce n'est pas vide
        }));
      } else {
        // Optionnel : Afficher un message d'erreur ou une alerte
        console.error("Valeur invalide : ", value);
      }
    };
  const handleSubmit = async () => {
    try {
      await draftSurveyReportService.createReport(formData);
      enqueueSnackbar(
        "Rapport du Draft Survey a été sauvegardé avec succès !",
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
                    id="lbp"
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
                        id="forePortInitial"
                        onChange={handleChange("forePortInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        value={formData.foreStbdInitial}
                        id="foreStbdInitial"
                        onChange={handleChange("foreStbdInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        id="foreMeanInitial"
                        value={(
                          ((Number(formData.forePortInitial) || 0) +
                            (Number(formData.foreStbdInitial) || 0)) /
                          2
                        ).toFixed(3)}
                        onChange={handleChange("foreMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Distance"
                        id="foreDistanceInitial"
                        value={formData.foreDistanceInitial}
                        onChange={handleChange("foreDistanceInitial")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Corrected"
                        id="foreCorrectedInitial"
                        value={calculatedValues.foreCorrectedInitial.toFixed(3)}
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
                        id="aftPortInitial"
                        value={formData.aftPortInitial}
                        onChange={handleChange("aftPortInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        id="aftStbdInitial"
                        value={formData.aftStbdInitial}
                        onChange={handleChange("aftStbdInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        id="aftMeanInitial"
                        value={(
                          ((Number(formData.aftPortInitial) || 0) +
                            (Number(formData.aftStbdInitial) || 0)) /
                          2
                        ).toFixed(3)}
                        onChange={handleChange("aftMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Distance"
                        id="aftDistanceInitial"
                        value={formData.aftDistanceInitial}
                        onChange={handleChange("aftDistanceInitial")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Corrected"
                        id="aftCorrectedInitial"
                        value={calculatedValues.aftCorrectedInitial.toFixed(3)}
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
                        id="midPortInitial"
                        value={formData.midPortInitial}
                        onChange={handleChange("midPortInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        id="midStbdInitial"
                        value={formData.midStbdInitial}
                        onChange={handleChange("midStbdInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        id="midMeanInitial"
                        value={(
                          ((Number(formData.midPortInitial) || 0) +
                            (Number(formData.midStbdInitial) || 0)) /
                          2
                        ).toFixed(3)}
                        onChange={handleChange("midMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Distance"
                        id="midDistanceInitial"
                        value={formData.midDistanceInitial}
                        onChange={handleChange("midDistanceInitial")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Corrected"
                        id="midCorrectedInitial"
                        value={calculatedValues.midCorrectedInitial.toFixed(3)}
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
                        id="meanForeAftInitial"
                        value={calculatedValues.meanForeAftInitial.toFixed(3)}
                        onChange={handleChange("meanForeAftInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean of Mean"
                        id="meanOfMeanInitial"
                        value={calculatedValues.meanOfMeanInitial.toFixed(3)}
                        onChange={handleChange("meanOfMeanInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Keel Correction Initial"
                        id="keelCorrectionInitial"
                        value={formData.keelCorrectionInitial.toFixed(3)}
                        onChange={handleChange("keelCorrectionInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Quarter Mean"
                        id="quarterMeanInitial"
                        value={calculatedValues.quarterMeanInitial.toFixed(3)}
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
                        id="forePortFinal"
                        value={formData.forePortFinal}
                        onChange={handleChange("forePortFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        id="foreStbdFinal"
                        value={formData.foreStbdFinal}
                        onChange={handleChange("foreStbdFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        id="foreMeanFinal"
                        value={(
                          ((Number(formData.forePortFinal) || 0) +
                            (Number(formData.foreStbdFinal) || 0)) /
                          2
                        ).toFixed(3)}
                        onChange={handleChange("foreMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Distance"
                        id="foreDistanceFinal"
                        value={formData.foreDistanceFinal}
                        onChange={handleChange("foreDistanceFinal")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Fore Corrected"
                        id="foreCorrectedFinal"
                        value={calculatedValues.foreCorrectedFinal.toFixed(3)}
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
                        id="aftPortFinal"
                        value={formData.aftPortFinal}
                        onChange={handleChange("aftPortFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        id="aftStbdFinal"
                        value={formData.aftStbdFinal}
                        onChange={handleChange("aftStbdFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        id="aftMeanFinal"
                        value={(
                          ((Number(formData.aftPortFinal) || 0) +
                            (Number(formData.aftStbdFinal) || 0)) /
                          2
                        ).toFixed(3)}
                        onChange={handleChange("aftMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Distance"
                        id="aftDistanceFinal"
                        value={formData.aftDistanceFinal}
                        onChange={handleChange("aftDistanceFinal")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Aft Corrected"
                        id="aftCorrectedFinal"
                        value={calculatedValues.aftCorrectedFinal.toFixed(3)}
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
                        id="midPortFinal"
                        value={formData.midPortFinal}
                        onChange={handleChange("midPortFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Stbd"
                        id="midStbdFinal"
                        value={formData.midStbdFinal}
                        onChange={handleChange("midStbdFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean"
                        id="midMeanFinal"
                        value={(
                          ((Number(formData.midPortFinal) || 0) +
                            (Number(formData.midStbdFinal) || 0)) /
                          2
                        ).toFixed(3)}
                        onChange={handleChange("midMeanFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Distance"
                        id="midDistanceFinal"
                        value={formData.midDistanceFinal}
                        onChange={handleChange("midDistanceFinal")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mid Corrected"
                        id="midCorrectedFinal"
                        value={calculatedValues.midCorrectedFinal.toFixed(3)}
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
                        id="meanForeAftFinal"
                        value={calculatedValues.meanForeAftFinal.toFixed(3)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Mean of Mean"
                        id="meanOfMeanFinal"
                        value={calculatedValues.meanOfMeanFinal.toFixed(3)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Keel Correction Final"
                        id="keelCorrectionFinal"
                        value={formData.keelCorrectionFinal}
                        onChange={handleChange("keelCorrectionFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Quarter Mean"
                        id="quarterMeanFinal"
                        value={calculatedValues.quarterMeanFinal.toFixed(3)}
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
                        id="correspondingDisplInitial"
                        value={formData.correspondingDisplInitial}
                        onChange={handleChange("correspondingDisplInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Trim Correction"
                        id="trimCorrectionInitial"
                        value={formData.trimCorrectionInitial}
                        onChange={handleChange("trimCorrectionInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Trim"
                        id="correctedDisplacementForTrimInitial"
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
                        id="densityDockWaterInitial"
                        value={formData.densityDockWaterInitial}
                        onChange={handleChange("densityDockWaterInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Density"
                        id="correctedDisplacementForDensityInitial"
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
                        id="deductiblesLiquidsInitial"
                        value={formData.deductiblesLiquidsInitial}
                        onChange={handleChange("deductiblesLiquidsInitial")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Net Light/Loaded Displacement"
                        id="netLightLoadDisplacementInitial"
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
                        id="correspondingDisplFinal"
                        value={formData.correspondingDisplFinal}
                        onChange={handleChange("correspondingDisplFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Trim Correction"
                        id="trimCorrectionFinal"
                        value={formData.trimCorrectionFinal}
                        onChange={handleChange("trimCorrectionFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Trim"
                        id="correctedDisplacementForTrimFinal"
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
                        id="densityDockWaterFinal"
                        value={formData.densityDockWaterFinal}
                        onChange={handleChange("densityDockWaterFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Corrected Displacement For Density"
                        id="correctedDisplacementForDensityfinal"
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
                        id="deductiblesLiquidsFinal"
                        value={formData.deductiblesLiquidsFinal}
                        onChange={handleChange("deductiblesLiquidsFinal")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Net Light/Loaded Displacement"
                        id="netLightLoadDisplacementFinal"
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
                    id="totalCargoLoadedOnBoard"
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

          {/* Calculation Section */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: "#ff0000" }}>
                Calculation
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Fore Distance Initial"
                    variant="outlined"
                    value={formData.foreDistanceInitial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        foreDistanceInitial: parseFloat(e.target.value),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Aft Distance Initial"
                    variant="outlined"
                    value={formData.aftDistanceInitial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aftDistanceInitial: parseFloat(e.target.value),
                      })
                    }
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
