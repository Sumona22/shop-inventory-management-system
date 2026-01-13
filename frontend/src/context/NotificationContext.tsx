import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../services/socketService";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { fetchMyNotificationsService } from "../services/notificationService";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  id?: string;
  _id?: string;
}

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const auth = useContext(AuthContext);
  const token = auth?.token;

  let userId: string | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      userId = decoded.id || decoded._id || null;
    } catch {}
  }

  const [notifications, setNotifications] = useState<any[]>([]);

  // ✅ FETCH FROM DB
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await fetchMyNotificationsService();
        setNotifications(res.data.data || []);
      } catch (err) {
        console.error("Fetch notifications failed", err);
      }
    };

    if (token) loadNotifications();
  }, [token]);

  // ✅ SOCKET REAL-TIME
  useEffect(() => {
    if (!token || !userId) return;

    socket.connect();
    socket.emit("join", userId);

    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);

      toast.info(notification.Title, {
        position: "top-right",
        autoClose: 4000,
      });
    });

    return () => {
      socket.off("new-notification");
      socket.disconnect();
    };
  }, [token, userId]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
