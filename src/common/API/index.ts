import axios from "axios";
import { GetStoredAuthToken, RemoveStoredAuthToken } from "../hooks/token";

const baseURL = "http://urban-api.us-east-1.elasticbeanstalk.com/";
// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `${baseURL}`,
});

export default api;
