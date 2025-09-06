import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend API base URL
  withCredentials: true, // Include cookies in requests
});