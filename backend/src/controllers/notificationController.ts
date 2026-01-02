import { Request, Response } from "express";
import Notification from "../models/Notification";

/* =====================================
   GET MY NOTIFICATIONS
===================================== */
export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const notifications = await Notification.find({
      User_ID: user.id
    })
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

    const count = await Notification.countDocuments({
      User_ID: user.id,
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

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        User_ID: user.id
      },
      {
        Is_Read: true
      },
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

    await Notification.updateMany(
      {
        User_ID: user.id,
        Is_Read: false
      },
      {
        Is_Read: true
      }
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
