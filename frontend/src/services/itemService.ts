import { api } from "../api/api";

/* Fetch all items for logged-in branch */
export const fetchItemsByBranch = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get("/stock/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Fetch item by ID */
export const fetchItemById = async (itemId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get(`/stock/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Create item (StoreStaff only) */
export const createItem = async (payload: {
  Branch_Product_ID: string;
  Item_No: string;
  Mfg_Date?: string;
  Warranty_Expiry?: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/stock/items", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Update item (Status / Dates only) */
export const updateItem = async (
  itemId: string,
  payload: {
    Item_Status?: "IN_STOCK" | "SOLD";
    Mfg_Date?: string;
    Warranty_Expiry?: string;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.put(`/stock/items/${itemId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
