const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  tiempo: `${API_BASE_URL}/api/tiempo/convertir`,
  peso: `${API_BASE_URL}/api/peso/convertir`,
  temperatura: `${API_BASE_URL}/api/temperatura/convertir`,
  moneda: `${API_BASE_URL}/api/moneda/convertir`
};

export default API_BASE_URL;