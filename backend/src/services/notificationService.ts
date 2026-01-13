import mongoose from "mongoose";
import Notification from "../models/Notification";
import { NotificationType } from "../models/Notification";
import { io } from "../server";

interface NotificationPayload {
  userId: string;
  senderId?: string;
  title: string;
  message: string;
  type: NotificationType;
  orderRequestId?: string;
  meta?: any;
}

export const createNotification = async (payload: NotificationPayload) => {
  try {
    const notification = await Notification.create({
      User_ID: new mongoose.Types.ObjectId(payload.userId),
      Sender_ID: payload.senderId
        ? new mongoose.Types.ObjectId(payload.senderId)
        : undefined,
      Title: payload.title,
      Message: payload.message,
      Type: payload.type,
      Order_Request_ID: payload.orderRequestId
        ? new mongoose.Types.ObjectId(payload.orderRequestId)
        : undefined,
      Meta: payload.meta
    });

    /* 🔔 REAL-TIME EMIT */
    io.to(payload.userId).emit("new-notification", notification);

    return notification;

  } catch (error) {
    console.error("Notification create failed:", error);
    return null;
  }
};

export const createBulkNotifications = async (
  payloads: NotificationPayload[]
) => {
  try {
    if (!payloads.length) return;

    const notifications = await Notification.insertMany(
      payloads.map(p => ({
        User_ID: new mongoose.Types.ObjectId(p.userId),
        Sender_ID: p.senderId
          ? new mongoose.Types.ObjectId(p.senderId)
          : undefined,
        Title: p.title,
        Message: p.message,
        Type: p.type,
        Order_Request_ID: p.orderRequestId
          ? new mongoose.Types.ObjectId(p.orderRequestId)
          : undefined,
        Meta: p.meta
      }))
    );

    /* 🔔 REAL-TIME EMIT (per user) */
    notifications.forEach((notification: any) => {
      io.to(notification.User_ID.toString()).emit(
        "new-notification",
        notification
      );
    });

    return notifications;

  } catch (error) {
    console.error("Bulk notification failed:", error);
    return null;
  }
};
