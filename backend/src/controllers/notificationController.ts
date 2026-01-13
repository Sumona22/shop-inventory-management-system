import { Request, Response } from "express";
import Notification, { NotificationType } from "../models/Notification";
import mongoose from "mongoose";
/* =====================================
   GET MY NOTIFICATIONS
===================================== */
export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const userId = user._id || user.id;

    const userRole = user.role;

    const filter: any = {
      User_ID: new mongoose.Types.ObjectId(userId)
    };

    // 🔐 Admin should see ONLY new order requests
    if (userRole === "Admin") {
      filter.Type = NotificationType.NEW_ORDER_REQUEST;
    }
    if (userRole === "StoreManager") {
    filter.Type = {
      $in: [
        NotificationType.ORDER_APPROVED,
        NotificationType.ORDER_MODIFIED,
        NotificationType.ORDER_REJECTED,
        NotificationType.STOCK_NOT_AVAILABLE // ✅ ADDED
      ]
    };
  }
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error
    });
  }
};

/* =====================================
   GET UNREAD COUNT
===================================== */
export const getUnreadNotificationCount = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userRole = user.role; 
    const userObjectId = new mongoose.Types.ObjectId(user._id);
    const filter: any = {
      User_ID: userObjectId,
      Is_Read: false
    };
    if (userRole === "Admin") {
      filter.Type = NotificationType.NEW_ORDER_REQUEST;
    }

    if (userRole === "StoreManager") {
      filter.Type = {
        $in: [
          NotificationType.ORDER_APPROVED,
          NotificationType.ORDER_MODIFIED,
          NotificationType.ORDER_REJECTED,
          NotificationType.STOCK_NOT_AVAILABLE // ✅ ADDED
        ]
      };
    }

    const count = await Notification.countDocuments({
      User_ID: userObjectId,
      Is_Read: false
    });


    res.json({
      unreadCount: count
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch unread count",
      error
    });
  }
};

/* =====================================
   MARK ONE AS READ
===================================== */
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const userObjectId = new mongoose.Types.ObjectId(user._id);

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        User_ID: userObjectId
      },
      { Is_Read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.json({
      message: "Notification marked as read",
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
      error
    });
  }
};

/* =====================================
   MARK ALL AS READ
===================================== */
export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const userObjectId = new mongoose.Types.ObjectId(user._id);

    await Notification.updateMany(
      {
        User_ID: userObjectId,
        Is_Read: false
      },
      { Is_Read: true }
    );
    res.json({
      message: "All notifications marked as read"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notifications",
      error
    });
  }
};
