import { api } from "../api/api";

/* ===========================
   AUTH HELPER
=========================== */
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/* ===========================
   STORE MANAGER
=========================== */

/* Create Order Request */
export const createOrderRequestService = async (payload: {
  Expected_Receive_Date: string | Date;
  Items: {
    Product_Variant_ID: string;
    Requested_Quantity: number;
  }[];
  Special_Instruction?: string;
}) => {
  if (!payload.Items || payload.Items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  payload.Items.forEach((item) => {
    if (!item.Product_Variant_ID) {
      throw new Error("Product Variant ID is required");
    }
    if (item.Requested_Quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }
  });

  return api.post("/order-requests", payload, {
    headers: getAuthHeader(),
  });
};

/* Get My Order Requests */
export const fetchMyOrderRequestsService = async () => {
  return api.get("/order-requests/my", {
    headers: getAuthHeader(),
  });
};

/* Get Single Order Request (Common) */
export const fetchOrderRequestByIdService = async (orderId: string) => {
  if (!orderId) throw new Error("Order Request ID is required");

  return api.get(`/order-requests/${orderId}`, {
    headers: getAuthHeader(),
  });
};

/* ===========================
   ADMIN
=========================== */

/* Get All Order Requests */
export const fetchAllOrderRequestsService = async (params?: {
  Branch_ID?: string;
  Status?: string;
  search?: string;
}) => {
  return api.get("/order-requests/admin", {
    params,
    headers: getAuthHeader(),
  });
};

/* Modify Order Quantities */
export const modifyOrderRequestService = async (
  orderId: string,
  payload: {
    Items: {
      Product_Variant_ID: string;
      Admin_Modified_Quantity: number;
    }[];
    Admin_Response_Message?: string;
  }
) => {
  if (!orderId) throw new Error("Order ID required");

  payload.Items.forEach((item) => {
    if (item.Admin_Modified_Quantity < 1) {
      throw new Error("Modified quantity must be at least 1");
    }
  });

  return api.patch(
    `/order-requests/admin/${orderId}/modify`,
    payload,
    {
      headers: getAuthHeader(),
    }
  );
};

/* Mark Waiting for Availability */
export const markWaitingForAvailabilityService = async (
  orderId: string,
  message: string
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.patch(
    `/order-requests/admin/${orderId}/waiting`,
    { message },
    {
      headers: getAuthHeader(),
    }
  );
};

/* Approve Order */
export const approveOrderRequestService = async (orderId: string) => {
  return api.patch(
    `/order-requests/admin/${orderId}/approve`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
};

/* Reject Order */
export const rejectOrderRequestService = async (
  orderId: string,
  message: string
) => {
  if (!message) throw new Error("Rejection message required");

  return api.patch(
    `/order-requests/admin/${orderId}/reject`,
    { message },
    {
      headers: getAuthHeader(),
    }
  );
};
