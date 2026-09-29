// src/api.js (Frontend)

import axios from "axios";

// Render Backend Base URL Setup
const API = axios.create({
  baseURL: "https://tasksphere-backend-kpyz.onrender.com",
  withCredentials: true,
});

// Request bhejte waqt LocalStorage se token nikal kar Header me attach karein
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;