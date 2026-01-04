import { api } from "../api/api";

export const createBranchWithManager = async (payload: {
  Business_ID: string | null;
  Branch_Name: string;
  Branch_Address: string;
  StoreManager_Email: string;
  StoreManager_Password: string;
}) => {
  const token = localStorage.getItem("token");

  return api.post(
    "/users/branch-with-manager",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
