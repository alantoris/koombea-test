import axios from "axios";
import { API_URL } from "./config";

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const setAuthToken = (authToken) => {
  API.defaults.headers.common['Authorization'] = `Token ${authToken}`;
};

export default API
