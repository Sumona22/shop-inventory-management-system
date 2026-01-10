import { api } from "../api/api";

/* Fetch StoreStaff + Cashier for current branch (StoreManager only) */
export const fetchStaffByBranch = async () => {
  return api.get("/users/staff");
};

/* Create StoreStaff or Cashier */
export const createStaffOrCashier = async (payload: {
  Role: string;
  Email: string;
  Password: string;
  Business_ID: string | null;
  Branch_ID: string | null;
}) => {
  const token = localStorage.getItem("token");

  return api.post(
    "/users/staff-or-cashier",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};