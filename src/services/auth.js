import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

const API_USER_URL = "http://localhost:8080/api/user";

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register`, userData);
};

export const loginUser = async (loginData) => {
  return await axios.post(`${API_BASE_URL}/login`, loginData);
};


export const dashboardGet = async (token) => {
  return await axios.get(`${API_USER_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};