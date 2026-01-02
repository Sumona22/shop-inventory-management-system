import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  User_ID: mongoose.Types.ObjectId;
  Title: string;
  Message: string;
  Is_Read: boolean;
}

const NotificationSchema = new Schema<INotification>(
  {
    User_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    Title: {
      type: String,
      required: true
    },
    Message: {
      type: String,
      required: true
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
