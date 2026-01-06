import mongoose, { Schema, Document } from "mongoose";

export enum NotificationType {
  NEW_ORDER_REQUEST = "NEW_ORDER_REQUEST",
  ORDER_APPROVED = "ORDER_APPROVED",
  ORDER_MODIFIED = "ORDER_MODIFIED",
  ORDER_REJECTED = "ORDER_REJECTED"
}

export interface INotification extends Document {
  User_ID: mongoose.Types.ObjectId;       // receiver
  Sender_ID?: mongoose.Types.ObjectId;    // who triggered it
  Title: string;
  Message: string;
  Type: NotificationType;
  Order_Request_ID?: mongoose.Types.ObjectId;
  Is_Read: boolean;
  Meta?: Record<string, any>;
}

const NotificationSchema = new Schema<INotification>(
  {
    User_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    Sender_ID: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    Title: {
      type: String,
      required: true
    },

    Message: {
      type: String,
      required: true
    },

    Type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true
    },

    Order_Request_ID: {
      type: Schema.Types.ObjectId,
      ref: "OrderRequest"
    },

    Meta: {
      type: Schema.Types.Mixed
    },

    Is_Read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
