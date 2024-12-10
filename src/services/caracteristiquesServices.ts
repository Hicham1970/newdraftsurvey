import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export interface CaracteristiquesData {
    grossWeight: number;
    netWeight: number;
    summerDraft: number;
    summerFreeboard: number;
    summerDeadweight: number;
    lightShip: number;
    constanteDeclared: number;
    loa: number;
    breadth: number;
    numberOfHolds: number;
    numberOfBallastTks: number;
    numberOfFWaterTks: number;
}

export const caracteristiquesAPI = {
    create: async (data: CaracteristiquesData) => {
        try {
            console.log('Sending data to server:', data);
            const response = await api.post('/caracteristiques', data);
            console.log('Server response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Full error object:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server error response:', error.response.data);
                throw new Error(
                    error.response.data.errors?.[0] || 
                    error.response.data.message || 
                    'Server error'
                );
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                throw new Error('No response from server. Please check if the server is running.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', error.message);
                throw new Error('Error setting up the request');
            }
        }
    }
};
