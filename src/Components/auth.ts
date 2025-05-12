// src/api/auth.ts
import axios from 'axios';

// export const API_URL = 'http://localhost:5000/api';
export const API_URL = 'https://calenderserver5.onrender.com/api';

export const register = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getCurrentUser = async () => {
  return axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};


