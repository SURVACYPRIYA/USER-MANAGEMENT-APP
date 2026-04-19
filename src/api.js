import axios from "axios";

const API = axios.create({
  baseURL: "https://user-management-1-9zr4.onrender.com"
});

export default API;