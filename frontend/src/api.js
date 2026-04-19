import axios from "axios";

const API = axios.create({
  baseURL: "https://user-management-1-9zr4.onrender.com"
});

// optional: global response handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data || { message: error.message }
    );
  }
);

export default API;