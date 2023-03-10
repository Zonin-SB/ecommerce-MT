import axios from 'axios';

export const axiosUserInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
  });