// authService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// const API_URL = 'http://localhost:8000/api'; // Your backend API URL

api.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      return AuthService.refreshToken()
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            return axios(originalRequest);
          }
        })
        .catch(err => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          console.error('err', err);
          return Promise.reject();
        });
    }
    Promise.reject(error);
  }
)

const AuthService = {
  login: (email, password) => {
    return api.post(`/login`, { email, password });
  },
  signup: (name, email, password) => {
    return api.post(`/signup`, { name, email, password });
  },
  dashboard: () => {
    const token = localStorage.getItem('token');
    return api.get(`/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  refreshToken: () => {
    const refreshToken = localStorage.getItem('refresh-token');
    return api.get(`/refreshToken`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
  }
};

export default AuthService;
