import axios from "axios";

const API_URL = "http://localhost:3000/api/dsreport";

// Interface for Draft Survey Report data
export interface IDSReport {
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

  // Drafts and Calculations - FORE
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

  // Drafts and Calculations - AFT
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

  // Drafts and Calculations - MID
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

class DraftSurveyReportService {
  // Create a new Draft Survey Report

  async createReport(reportData: IDSReport): Promise<IDSReport> {
    try {
      console.log("Envoi des données au serveur :", reportData);
      const response = await axios.post(API_URL, reportData);
      console.log("Réponse du serveur :", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      console.error("Erreur de Reseau :", error);
      console.error("Erreur de Configuration :", error);
      throw this.handleError(error);
    }
  }

  // Get all Draft Survey Reports
  async getAllReports(): Promise<IDSReport[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get a specific Draft Survey Report by ID
  async getReportById(id: string): Promise<IDSReport> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update a Draft Survey Report
  async updateReport(id: string, reportData: IDSReport): Promise<IDSReport> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, reportData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a Draft Survey Report
  async deleteReport(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling helper
  // Error handling helper
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // La requête a été effectuée et le serveur a répondu avec un code de statut en dehors de la plage 2xx
        const errorMessage =
          error.response.data?.message || error.response.statusText;
        console.error("Réponse du serveur :", error.response.data);
        console.error("Statut :", error.response.status);
        console.error("En-têtes :", error.response.headers);
        return new Error(`Erreur API : ${errorMessage}`); // Message d'erreur plus clair
      } else if (error.request) {
        // La requête a été effectuée mais aucune réponse n'a été reçue
        console.error("Demande :", error.request);
        return new Error(
          "Erreur API : Erreur réseau (aucune réponse du serveur)"
        );
      } else {
        // Quelque chose s'est produit lors de la configuration de la requête qui a déclenché une erreur
        console.error("Erreur de configuration :", error.message);
        return new Error("Erreur API : Erreur de configuration de la requête");
      }
    } else {
      // Gestion des autres types d'erreurs
      console.error("Autre erreur :", error);
      return new Error("Erreur inattendue : " + error.message); // Ajout du message d'erreur original
    }
  }
}

const draftSurveyReportService = new DraftSurveyReportService();
export default draftSurveyReportService;
