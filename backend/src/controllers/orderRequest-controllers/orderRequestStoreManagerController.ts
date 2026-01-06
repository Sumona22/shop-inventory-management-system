import { Request, Response } from "express";
import OrderRequest from "../../models/OrderRequest";
import { OrderRequestStatus } from "../../models/OrderRequest";
import User from "../../models/User";
import { createBulkNotifications } from "../../services/notificationService";
import { NotificationType } from "../../models/Notification";
import mongoose from "mongoose";

/* =====================================
   CREATE ORDER REQUEST (STORE MANAGER)
===================================== */
export const createOrderRequest = async (req: Request & { user?: any }, res: Response) => {
  try {
    const {
      Expected_Receive_Date,
      Special_Instruction,
      Items
    } = req.body;

    // ✅ Validation
    if (!Items || Items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const order = await OrderRequest.create({
      Business_ID: req.user.Business_ID,     // ✅ FROM TOKEN
      Branch_ID: req.user.Branch_ID,         // ✅ FROM TOKEN
      Store_Manager_ID: req.user._id,        // ✅ FROM TOKEN

      Order_Request_Number: `OR-${Date.now()}`,
      Expected_Receive_Date,
      Special_Instruction,
      Items,
      Status: OrderRequestStatus.CREATED
    });

// ================= NOTIFICATION (ADMIN) =================
    const admins = await User.find({
      Role: "Admin",
      Business_ID: new mongoose.Types.ObjectId(req.user.Business_ID)
    });

    await createBulkNotifications(
      admins.map(admin => ({
        userId: String(admin._id),
        senderId: String((req as any).user._id),
        title: "New Order Request",
        message: "A new order request has been submitted by a branch",
        type: NotificationType.NEW_ORDER_REQUEST,
        orderRequestId: String(order._id)
      }))
    );

    console.log("ADMIN NOTIFICATION CREATED");

    
    res.status(201).json({
      message: "Order request submitted successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create order request",
      error
    });
  }
};

/* =====================================
   STORE MANAGER – MY ORDER REQUESTS
===================================== */
export const getMyOrderRequests = async (req: Request & { user?: any }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await OrderRequest.find({
      Store_Manager_ID: req.user._id
    })
      .sort({ createdAt: -1 })
      .populate("Branch_ID")
      .populate("Items.Product_Variant_ID");

    res.json({ data: orders });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error
    });
  }
};
