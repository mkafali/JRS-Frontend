import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://efficient-communication-production.up.railway.app:8080', // Adjust the baseURL as needed
  withCredentials: true, // Enable sending cookies with each request
});

// Optional: Add response interceptors for centralized error handling
// instance.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// );

export default instance;
