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
   FETCH
=========================== */
export const fetchMyNotificationsService = async () => {
  return api.get("/notifications/my", {
    headers: getAuthHeader(),
  });
};

/* ===========================
   MARK SINGLE AS READ
=========================== */
export const markNotificationReadService = async (
  notificationId: string
) => {
  if (!notificationId) {
    throw new Error("Notification ID is required");
  }

  return api.patch(
    `/notifications/${notificationId}/read`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
};

/* ===========================
   MARK ALL AS READ
=========================== */
export const markAllNotificationsReadService = async () => {
  return api.patch(
    "/notifications/read-all",
    {},
    {
      headers: getAuthHeader(),
    }
  );
};
