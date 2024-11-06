import axios from 'axios';

// User Service API
export const userServiceApi = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVICE_URL, 
  withCredentials: true,
});

// Paste Service API
export const pasteServiceApi = axios.create({
  baseURL: process.env.REACT_APP_PASTE_SERVICE_URL,
  withCredentials: true,
});

