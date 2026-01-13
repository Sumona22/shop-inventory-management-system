import { Request, Response } from "express";
import User from "../../models/User";
import OrderRequest from "../../models/OrderRequest";
import { OrderRequestStatus } from "../../models/OrderRequest";
import { createNotification } from "../../services/notificationService";
import { NotificationType } from "../../models/Notification";

/* =====================================
   ADMIN – GET ALL ORDER REQUESTS
===================================== */
export const getAllOrderRequests = async (req: Request, res: Response) => {
  try {
    const { Branch_ID, Status, search } = req.query;

    const filter: any = {
      Business_ID: (req as any).user.Business_ID, // ✅ IMPORTANT FIX
    };

    if (Branch_ID) filter.Branch_ID = Branch_ID;
    if (Status) filter.Status = Status;

    if (search) {
      filter.Order_Request_Number = { $regex: search, $options: "i" };
    }

    const orders = await OrderRequest.find(filter)
      .sort({ createdAt: -1 })
      .populate("Store_Manager_ID", "name email")
      .populate("Branch_ID")
      .populate("Items.Product_Variant_ID");

    res.json({ data: orders });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order requests",
      error,
    });
  }
};

/* =====================================
   ADMIN – MODIFY ORDER
===================================== */
export const modifyOrderRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Items, Admin_Response_Message } = req.body;

    const order = await OrderRequest.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.Items.forEach((item: any) => {
    const updatedItem = (Items as any[]).find(
      (i: any) =>
        i.Product_Variant_ID.toString() ===
        item.Product_Variant_ID.toString()
    );

    if (updatedItem) {
      item.Admin_Modified_Quantity = updatedItem.Admin_Modified_Quantity;
    }
  });

    order.Status = OrderRequestStatus.MODIFIED_BY_ADMIN;
    order.Admin_Response_Message = Admin_Response_Message;
    order.Admin_Responded_By = (req as any).user._id;

    await order.save();

    await createNotification({
      userId: String(order.Store_Manager_ID),
      senderId: String((req as any).user._id),
      title: "Order Modified",
      message: "Admin modified quantities in your order request",
      type: NotificationType.ORDER_MODIFIED,
      orderRequestId: String(order._id),
      meta: { modifiedItems: Items }
    });

    console.log("STORE MANAGER NOTIFICATION CREATED");
    res.json({
      message: "Order modified successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to modify order", error });
  }
};

/* =====================================
   ADMIN – STOCK NOT AVAILABLE
===================================== */
export const markWaitingForAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const order = await OrderRequest.findByIdAndUpdate(
      id,
      {
        Status: OrderRequestStatus.WAITING_FOR_AVAILABILITY,
        Admin_Response_Message: message,
        Admin_Responded_By: (req as any).user._id
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await createNotification({
      userId: String(order.Store_Manager_ID),
      senderId: String((req as any).user._id),
      title: "Stock Not Available",
      message: "Some items are currently not available. Please wait.",
      type: NotificationType.ORDER_MODIFIED,
      orderRequestId: String(order._id)
    });

    console.log("STORE MANAGER NOTIFICATION CREATED");


    res.json({
      message: "Marked as waiting for availability",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};

/* =====================================
   ADMIN – APPROVE ORDER
===================================== */
export const approveOrderRequest = async (req: Request, res: Response) => {
  try {
    const order = await OrderRequest.findByIdAndUpdate(
      req.params.id,
      {
        Status: OrderRequestStatus.APPROVED,
        Admin_Responded_By: (req as any).user._id
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await createNotification({
      userId: String(order.Store_Manager_ID),
      senderId: String((req as any).user._id),
      title: "Order Approved",
      message: "Your order request has been approved by admin",
      type: NotificationType.ORDER_APPROVED,
      orderRequestId: String(order._id)
    });

    console.log("STORE MANAGER NOTIFICATION CREATED");


    res.json({
      message: "Order approved successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to approve order", error });
  }
};

/* =====================================
   ADMIN – REJECT ORDER
===================================== */
export const rejectOrderRequest = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const order = await OrderRequest.findByIdAndUpdate(
      req.params.id,
      {
        Status: OrderRequestStatus.REJECTED,
        Admin_Response_Message: message,
        Admin_Responded_By: (req as any).user._id
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await createNotification({
      userId: String(order.Store_Manager_ID),
      senderId: String((req as any).user._id),
      title: "Order Rejected",
      message: "Your order request was rejected by admin",
      type: NotificationType.ORDER_REJECTED,
      orderRequestId: String(order._id)
    });

    console.log("STORE MANAGER NOTIFICATION CREATED");


    res.json({
      message: "Order rejected successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to reject order", error });
  }
};
