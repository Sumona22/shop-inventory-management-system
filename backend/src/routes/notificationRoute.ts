import { Router } from "express";
import {
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllAsRead
} from "../controllers/notificationController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

/* =====================================
   NOTIFICATION ROUTES
===================================== */

// Get all notifications
router.get(
  "/",
  protect,
  getMyNotifications
);

// Unread count (badge)
router.get(
  "/unread-count",
  protect,
  getUnreadNotificationCount
);

// Mark one notification as read
router.patch(
  "/:id/read",
  protect,
  markNotificationAsRead
);

// Mark all notifications as read
router.patch(
  "/read-all",
  protect,
  markAllAsRead
);

export default router;
