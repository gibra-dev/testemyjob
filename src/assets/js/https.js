import axios from 'axios';

// Configuração base do Axios
const apiClient = axios.create({
  baseURL: 'https://www.realidadeseposibilidades.online', // URL base
  headers: {
    'Content-Type': 'application/json', 
  },
  timeout: 100000, 
});

// Exportar o cliente configurado
export default apiClient;