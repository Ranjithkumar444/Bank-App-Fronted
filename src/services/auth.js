import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

const API_USER_URL = "http://localhost:8080/api/user";

const API_BANK_URL = "http://localhost:8080/api/bank"

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

export const withdrawAmount = async (withdrawData, token) => {
  return await axios.post(`${API_BANK_URL}/withdraw`, withdrawData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const creditAmount = async (creditData,token) => {
  return await axios.post(`${API_BANK_URL}/credit`,creditData,{
    headers: { Authorization: `Bearer ${token}`},
  });
}

export const transferAmount = async (transferData,token) => {
  return await axios.post(`${API_BANK_URL}/transfer`,transferData,{
    headers: { Authorization: `Bearer ${token}`},
  });
}

export const balanceCheck = async (balanceData,token) => {
  return await axios.post(`${API_BANK_URL}/balance`,balanceData,{
    headers: { Authorization: `Bearer ${token}`},
  });
}


export const transactionHistory = async (transactionData,token) => {
  return await axios.post(`${API_BANK_URL}/transaction-history`,transactionData,{
    headers: { Authorization: `Bearer ${token}`},
  });
}