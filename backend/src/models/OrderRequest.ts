import mongoose, { Schema, Document } from "mongoose";

export enum OrderRequestStatus {
  CREATED = "CREATED",                     // store manager submitted
  UNDER_ADMIN_REVIEW = "UNDER_ADMIN_REVIEW",
  MODIFIED_BY_ADMIN = "MODIFIED_BY_ADMIN", // quantity/date modified
  WAITING_FOR_AVAILABILITY = "WAITING_FOR_AVAILABILITY", // stock not available
  APPROVED = "APPROVED",                   // sent to supplier
  REJECTED = "REJECTED"
}

/* ===== Item Interface ===== */
export interface IOrderRequestItem {
  Product_Variant_ID: mongoose.Types.ObjectId;
  Requested_Quantity: number;
  Admin_Modified_Quantity?: number;
}

/* ===== Order Request Interface ===== */
export interface IOrderRequest extends Document {
  Business_ID: mongoose.Types.ObjectId;   
  Branch_ID: mongoose.Types.ObjectId;
  Store_Manager_ID: mongoose.Types.ObjectId;
  
  Order_Request_Number:String;
  Expected_Receive_Date: Date;
  Special_Instruction?: string;
  
  Admin_Response_Message?:String;
  Admin_Responded_By?:mongoose.Types.ObjectId;
  
  Status: OrderRequestStatus;
  Items: IOrderRequestItem[];

  createdAt: Date;
  updatedAt: Date;
}

/* ===== Item Schema ===== */
const OrderRequestItemSchema = new Schema<IOrderRequestItem>({
  Product_Variant_ID: {
    type: Schema.Types.ObjectId,
    ref: "ProductVariant",
    required: true
  },
  Requested_Quantity: {
    type: Number,
    required: true,
    min: 1
  },
  Admin_Modified_Quantity: {
    type: Number,
    min: 1
  }
});

/* ===== Main Schema ===== */
const OrderRequestSchema = new Schema<IOrderRequest>(
  {
    Business_ID: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    Store_Manager_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    Branch_ID: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },

    Order_Request_Number: {
      unique: true,
      type: String, 
      required: true,                      /* Order_Request_Number → readable (Human-readable tracking) Emails/ invoices / support calls */
      
    },

    Expected_Receive_Date: {
      type: Date,
      required: true
    },

    Special_Instruction: {
      type: String,
      trim: true,
      maxlength: 500
    },

    Admin_Response_Message: {
      type: String,
      trim: true,
      maxlength: 500
    },

    Admin_Responded_By: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },


    Status: {
      type: String,
      enum: Object.values(OrderRequestStatus),
      default: OrderRequestStatus.CREATED
    },

    Items: {
      type: [OrderRequestItemSchema],
      validate: [
        (arr: any[]) => arr.length > 0,
        "Order must have at least one item"
        ],
        required: true
    }
  },
  { timestamps: true }
);
/* ===== Indexes for performance ===== */

// Admin dashboard: filter by branch + status
OrderRequestSchema.index({ Branch_ID: 1, Status: 1 });

// Store manager dashboard: see own requests
OrderRequestSchema.index({ Store_Manager_ID: 1 });

// Fast search by order number
// OrderRequestSchema.index({ Order_Request_Number: 1 });

export default mongoose.model<IOrderRequest>(
  "OrderRequest",
  OrderRequestSchema
);
