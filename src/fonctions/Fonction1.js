import { FunctionsOutlined } from "@mui/icons-material";
import DraftSurveyReport from "../pages/DraftSurveyReport"; 


/**Les distances drafts marks-perpendiculaires */
const foreDistanceInitial=document.getElementById("distanceForeInitial");
const aftDistanceInitial=document.getElementById("distanceAftInitial");
const midDistanceInitial = document.getElementById("distanceMidInitial");
const foreDistanceFinal = document.getElementById("distanceForeFinal");
const aftDistanceFinal = document.getElementById("distanceAftFinal");
const midDistanceFinal = document.getElementById("distanceMidFinal");

// draft observés
const forePortInitial=document.getElementById("forePortInitial");
const foreStbdInitial = document.getElementById("foreStbdInitial");
const foreMeanInitial = document.getElementById("foreMeanInitial");
const aftPortInitial = document.getElementById("aftPortInitial");
const aftStbdInitial = document.getElementById("aftStbdInitial");
const aftMeanInitial = document.getElementById("aftMeanInitial");
const midPortInitial = document.getElementById("midPortInitial");
const midStbdInitial = document.getElementById("midStbdInitial");
const midMeanInitial = document.getElementById("midMeanInitial");

const forePortFinal=document.getElementById("forePortFinal");
const foreStbdFinal = document.getElementById("foreStbdFinal");
const foreMeanFinal = document.getElementById("foreMeanFinal");
const aftPortFinal = document.getElementById("aftPortFinal");
const aftStbdFinal = document.getElementById("aftStbdFinal");
const aftMeanFinal = document.getElementById("aftMeanFinal");
const midPortFinal = document.getElementById("midPortFinal"); 
const midStbdFinal = document.getElementById("midStbdFinal");
const midMeanFinal = document.getElementById("midMeanFinal");

/**Les corrections des distances / marks-perpendiculaires */
const foreCorrectionInitial = document.getElementById("foreCorrectionInitial");
const aftCorrectionInitial=document.getElementById("aftCorrectionInitial");
const midCorrectionInitial = document.getElementById("midCorrectionInitial");
const foreCorrectionFinal = document.getElementById("foreCorrectionFinal");
const aftCorrectionFinal = document.getElementById("aftCorrectionFinal");
const midCorrectionFinal = document.getElementById("midCorrectionFinal");
// draft Corrected:
const foreCorrectedInitial = document.getElementById("foreCorrectedInitial");
const aftCorrectedInitial = document.getElementById("aftCorrectedInitial");
const midCorrectedInitial = document.getElementById("midCorrectedInitial");
const foreCorrectedFinal = document.getElementById("foreCorrectedFinal");
const aftCorrectedFinal = document.getElementById("aftCorrectedFinal");
const midCorrectedFinal = document.getElementById("midCorrectedFinal");

// Means
const meanForeAftInitial = document.getElementById("meanForeAftInitial");
const meanOfMeanInitial = document.getElementById("meanOfMeanInitial");
const quarterMeanInitial = document.getElementById("quarterMeanInitial");
const meanForeAftFinal = document.getElementById("meanForeAftFinal");
const meanOfMeanFinal = document.getElementById("meanOfMeanFinal");
const quarterMeanFinal = document.getElementById("quarterMeanFinal");

// Displacement Calculations:
const correspondingDisplInitial = document.getElementById("correspondingDisplInitial");
const correspondingDisplFinal = document.getElementById("correspondingDisplFinal");
const trimCorrectionInitial = document.getElementById("trimCorrectionInitial");
const trimCorrectionFinal = document.getElementById("trimCorrectionFinal");
const correctedDisplacementForTrimInitial = document.getElementById("correctedDisplacementForTrimInitial");
const correctedDisplacementForTrimFinal = document.getElementById("correctedDisplacementForTrimFinal");
const densityDockWaterInitial = document.getElementById("densityDockWaterInitial");
const densityDockWaterFinal = document.getElementById("densityDockWaterFinal");
const correctedDisplacementForDensityInitial = document.getElementById("correctedDisplacementForDensityInitial");
const correctedDisplacementForDensityFinal = document.getElementById("correctedDisplacementForDensityFinal");
const deductiblesLiquidsInitial = document.getElementById("deductiblesLiquidsInitial");
const deductiblesLiquidsFinal = document.getElementById("deductiblesLiquidsFinal");
const netLightLoadedDisplacementInitial = document.getElementById("netLightLoadedDisplacementInitial");
const netLightLoadedDisplacementFinal = document.getElementById("netLightLoadedDisplacementFinal");
const totalCargoLoadedOnBoard = document.getElementById("totalCargoLoadedOnBoard");

/**Le LBP et le LBM */
const lbp=document.getElementById("lbp");
// const lbm=document.getElementById("lbm");
/**THE KELL CORRECTION */ 
const keelCorrectionInitial=document.getElementById("keelCorrectionInitial");
const keelCorrectionFinal=document.getElementById("keelCorrectionFinal");
/*Les draft Observés*/

/**Assigner un rôle au btnCalc */

export default Function calculateValues () {
  try {
    // Calculate means Initial
    const moyenneForInitial = ((parseFloat(formData.forePortInitial) + parseFloat(formData.foreStbdInitial)) / 2).toFixed(3);
    const moyenneAftInitial = ((parseFloat(formData.aftPortInitial) + parseFloat(formData.aftStbdInitial)) / 2).toFixed(3);
    const moyenneMidInitial = ((parseFloat(formData.midPortInitial) + parseFloat(formData.midStbdInitial)) / 2).toFixed(3);

    // Calculate LBM
    let lbm = parseFloat(formData.lbp);
    const foreDistanceInitial = parseFloat(formData.foreDistanceInitial);
    const aftDistanceInitial = parseFloat(formData.aftDistanceInitial);

    if (foreDistanceInitial < 0 && aftDistanceInitial > 0) {
      lbm -= foreDistanceInitial - aftDistanceInitial;
    } else if (foreDistanceInitial > 0 && aftDistanceInitial < 0) {
      lbm += foreDistanceInitial + aftDistanceInitial;
    } else if (foreDistanceInitial < 0 && aftDistanceInitial < 0) {
      lbm += aftDistanceInitial - foreDistanceInitial;
    } else if (foreDistanceInitial > 0 && aftDistanceInitial > 0) {
      lbm += foreDistanceInitial + aftDistanceInitial;
    } else if (foreDistanceInitial === 0 && aftDistanceInitial === 0) {
      lbm = parseFloat(formData.lbp);
    } else if (foreDistanceInitial === 0 && aftDistanceInitial   < 0) {
      lbm = parseFloat(formData.lbp) + Math.abs(aftDistanceInitial);
    } else if (foreDistanceInitial === 0 && aftDistanceInitial > 0) {
      lbm = parseFloat(formData.lbp) - Math.abs(aftDistanceInitial);
    } else if (foreDistanceInitial > 0 && aftDistanceInitial === 0) {
      lbm = parseFloat(formData.lbp) - Math.abs(foreDistanceInitial);
    } else if (foreDistanceInitial < 0 && aftDistanceInitial === 0) {
      lbm = parseFloat(formData.lbp) + Math.abs(foreDistanceInitial);
    }

    // Calculate TrimObserved
    const trimObservedInitial = (parseFloat(moyenneAftInitial) - parseFloat(moyenneForInitial)).toFixed(2);
    const trimObservedFinal = (parseFloat(moyenneAftFinal) - parseFloat(moyenneForFinal)).toFixed(2);
    //Calculate Draft Corrected:
    // Fore Initial
    if(foreDistanceInitial<0){
      foreCorrectedInitial=meanForeInitial-((trimObservedInitial*foreDistanceInitial)/lbm);
    }else if(foreDistanceInitial>0){
      foreCorrectedInitial=meanForeInitial+((trimObservedInitial*foreDistanceInitial)/lbm);
    }else if(foreDistanceInitial===0){
      foreCorrectedInitial=meanForeInitial;
    }

    //Aft Initial
    if(aftDistanceInitial<0){
      aftCorrectedInitial=meanAftInitial-((trimObservedInitial*aftDistanceInitial)/lbm);
    }else if(aftDistanceInitial>0){
      aftCorrectedInitial=meanAftInitial+((trimObservedInitial*aftDistanceInitial)/lbm);
    }else if(aftDistanceInitial===0){
      aftCorrectedInitial=meanAftInitial;
    }

    //Mid Initial
    if(midDistanceInitial<0){
      midCorrectedInitial=meanMidInitial-((trimObservedInitial*midDistanceInitial)/lbm);
    }else if(midDistanceInitial>0){
      midCorrectedInitial=meanMidInitial+((trimObservedInitial*midDistanceInitial)/lbm);
    }else if(midDistanceInitial===0){
      midCorrectedInitial=meanMidInitial;
    }


    // Fore Final
    if(foreDistanceFinal<0){
      foreCorrectedFinal=meanForeFinal-((trimObservedFinal*foreDistanceFinal)/lbm);
    }else if(foreDistanceFinal>0){
      foreCorrectedFinal=meanForeFinal+((trimObservedFinal*foreDistanceFinal)/lbm);
    }else if(foreDistanceFinal===0){
      foreCorrectedFinal=meanForeFinal;
    }

    //Aft Final
    if(aftDistanceFinal<0){
      aftCorrectedFinal=meanAftFinal-((trimObservedFinal*aftDistanceFinal)/lbm);
    }else if(aftDistanceFinal>0){
      aftCorrectedFinal=meanAftFinal+((trimObservedFinal*aftDistanceFinal)/lbm);
    }else if(aftDistanceFinal===0){
      aftCorrectedFinal=meanAftFinal;
    }

    //Mid Final
    if(midDistanceFinal<0){
      midCorrectedFinal=meanMidFinal-((trimObservedFinal*midDistanceFinal)/lbm);
    }else if(midDistanceFinal>0){
      midCorrectedFinal=meanMidFinal+((trimObservedFinal*midDistanceFinal)/lbm);
    }else if(midDistanceFinal===0){
      midCorrectedFinal=meanMidFinal;
    }
    
    // Trim Corrected:
    const trimCorrectedInitial = (aftCorrectedInitial - foreCorrectedInitial).toFixed(2);
    const trimCorrectedFinal = (aftCorrectedFinal - foreCorrectedFinal).toFixed(2);
    // Mean Fore Aft Initial:
    const meanForeAftInitial = ((foreCorrectedInitial + aftCorrectedInitial) / 2).toFixed(2);
    // Mean Of Mean Initial:
    const meanOfMeanInitial = ((meanForeAftInitial + midCorrectedInitial) / 2).toFixed(2);
    // Quarter Mean Initial:
    const quarterMeanInitial = ((meanOfMeanInitial + midCorrectedInitial) / 2).toFixed(2);
    // Mean Fore Aft Final:
    const meanForeAftFinal = ((foreCorrectedFinal + aftCorrectedFinal) / 2).toFixed(2);
    // Mean Of Mean Final:
    const meanOfMeanFinal = ((meanForeAftFinal + midCorrectedFinal) / 2).toFixed(2);
    // Quarter Mean Final:
    const quarterMeanFinal = ((meanOfMeanFinal + midCorrectedFinal) / 2).toFixed(2);

   // Calculate Displacements:

    // Update form data with calculated values
    setFormData(prev => ({
      ...prev,
      trim: trim,
      lbm: lbm.toFixed(2),
      foreCorrectedInitial: foreCorrectedInitial.toFixed(2),
      aftCorrectedInitial: aftCorrectedInitial.toFixed(2),
      midCorrectedInitial: midCorrectedInitial.toFixed(2),
      foreCorrectedFinal: foreCorrectedFinal.toFixed(2),
      aftCorrectedFinal: aftCorrectedFinal.toFixed(2),
      midCorrectedFinal: midCorrectedFinal.toFixed(2),
      trimCorrectedInitial: trimCorrectedInitial,
      trimCorrectedFinal: trimCorrectedFinal,
      meanForeAftInitial: meanForeAftInitial,
      meanOfMeanInitial: meanOfMeanInitial,
      quarterMeanInitial: quarterMeanInitial,
      meanForeAftFinal: meanForeAftFinal,
      meanOfMeanFinal: meanOfMeanFinal,
      quarterMeanFinal: quarterMeanFinal,
      keelCorrectionInitial: keelCorrectionInitial,
      keelCorrectionFinal: keelCorrectionFinal
    }));

  } catch (error) {
    console.error(error);
    alert("Error in calculations. Please check your input values.");
  }
};
