import axios from 'axios';

const api = axios.create({
  baseURL: 'http://167.71.173.191:3000',
});

// online 167.71.173.191
// local 192.168.1.24

export default api;
