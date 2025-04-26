
// src/api/events.ts
import axios from 'axios';
import { API_URL } from './auth';


export const getEvents = async () => {
  return axios.get(`${API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const createEvent = async (event: any) => {
  return axios.post(`${API_URL}/events`, event, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateEvent = async (id: number, event: any) => {
  return axios.put(`${API_URL}/events/${id}`, event, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteEvent = async (id: number) => {
  return axios.delete(`${API_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};