import { FunctionsOutlined } from "@mui/icons-material";
import ValeursInitial from "../pages/ValeursInitial";


/**Les distances drafts marks-perpendiculaires */
const distanceFore=document.getElementById("distanceFore");
const distanceAft=document.getElementById("distanceAft");
const distanceMid=document.getElementById("distanceMid");

const distanceForeType=document.getElementById("distanceForeType");
const distanceAftType=document.getElementById("distanceAftType");
const distanceMidType=document.getElementById("distanceMidType");

/**Le LBP et le LBM */
const lbp=document.getElementById("lbp");
const lbm="";
/**THE KILL CORRECTION */ 
const keelCorrection=document.getElementById("keelCorrection");
/*Les draft Observés*/
const forePort=document.getElementById("forePort");
const foreStbd=document.getElementById("foreStbd");
const aftPort=document.getElementById("aftPort");
const aftStbd=document.getElementById("aftStbd");
const midPort=document.getElementById("midPort");
const midStbd=document.getElementById("midStbd");

/**Assigner un rôle au btnCalc */

export default Function calculateValues () {
  try {
    // Calculate means
    const moyenneFor = ((parseFloat(formData.forePort) + parseFloat(formData.foreStbd)) / 2).toFixed(3);
    const moyenneAft = ((parseFloat(formData.aftPort) + parseFloat(formData.aftStbd)) / 2).toFixed(3);
    const moyenneMid = ((parseFloat(formData.midPort) + parseFloat(formData.midStbd)) / 2).toFixed(3);

    // Calculate LBM
    let lbm = parseFloat(formData.lbp);
    const distanceFore = parseFloat(formData.distanceFore);
    const distanceAft = parseFloat(formData.distanceAft);

    if (formData.distanceForeType === "A" && formData.distanceAftType === "F") {
      lbm -= distanceFore - distanceAft;
    } else if (formData.distanceForeType === "F" && formData.distanceAftType === "A") {
      lbm += distanceFore + distanceAft;
    } else if (formData.distanceForeType === "A" && formData.distanceAftType === "A") {
      lbm += distanceAft - distanceFore;
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

    // Update form data with calculated values
    setFormData(prev => ({
      ...prev,
      trim: trim,
      lbm: lbm.toFixed(2)
    }));

  } catch (error) {
    console.error(error);
    alert("Error in calculations. Please check your input values.");
  }
};