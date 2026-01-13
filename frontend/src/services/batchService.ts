import { api } from "../api/api";

/* Fetch all batches for branch */
export const fetchBatchesByBranch = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get("/stock/batches/branch", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Fetch batch by ID */
export const fetchBatchById = async (batchId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get(`/stock/batches/${batchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Create batch (StoreStaff only) */
export const createBatch = async (payload: {
  Branch_Product_ID: string;
  Quantity: number;
  Mfg_Date?: string;
  Exp_Date?: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/stock/batches", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Update batch (Quantity / Dates only) */
export const updateBatch = async (
  batchId: string,
  payload: {
    Quantity?: number;
    Mfg_Date?: string;
    Exp_Date?: string;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.put(`/stock/batches/${batchId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
