import api from './api';

const authService = {
  
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (firstName, lastName, email, password) => {
    const response = await api.post('/api/auth/register', { firstName, lastName, email, password });
    return response.data;
  }
};
 
export default authService;