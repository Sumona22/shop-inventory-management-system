import { api } from "../api/api";

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