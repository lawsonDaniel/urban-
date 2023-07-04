import axios from "axios";
import { GetStoredAuthToken } from "../hooks/token";

const baseURL = "https://ui62646llb.execute-api.us-east-1.amazonaws.com/prod";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `${baseURL}`,
});

// Add an interceptor to include JWT in request headers if available
api.interceptors.request.use(
  (config) => {
    const jwt = GetStoredAuthToken(); // Replace getJWT() with the function to get the JWT from your storage or state

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
