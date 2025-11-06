import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // relative path so CRA/Vite proxy works

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUserAPI = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return res.data;
};
