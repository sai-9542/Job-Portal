import axios from 'axios';

const API_BASE_URL = 'https://jsonfakery.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed, e.g., Authorization
  },
  // You can also set timeout, params, etc.
});

export default api;
