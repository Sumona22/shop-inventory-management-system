import { api } from "../api/api";

/* Fetch all branches (Admin only) */
export const fetchBranches = async () => {
  return api.get("/branches");
};

/* Create branch with store manager (Admin only) */
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
