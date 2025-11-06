import axios from "axios";
import type { LoginPayload } from "../types/auth";

const API_URL = "http://localhost:5000/api/auth"; 

export const loginAPI = async (payload: LoginPayload) => {
  const res = await axios.post(`${API_URL}/login`, payload);
  return res.data; 
};


export const registerBusinessAPI = async (payload: {
  Business_Name: string;
  Business_Email: string;
  Primary_Phone_No: string;
  Password: string;
  Primary_Address: string;
}) => {
  const res = await axios.post(`${API_URL}/register-business`, payload);
  return res.data;
};
