// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Your backend API URL

const AuthService = {
  login: (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
  },
  signup: (name, email, password) => {
    return axios.post(`${API_URL}/signup`, { name, email, password });
  },
};

export default AuthService;
