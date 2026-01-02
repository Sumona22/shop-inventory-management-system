import { Request, Response } from "express";
import User from "../../models/User";
import OrderRequest from "../../models/OrderRequest";
import { OrderRequestStatus } from "../../models/OrderRequest";

/* =====================================
   CREATE ORDER REQUEST (STORE MANAGER)
===================================== */
export const createOrderRequest = async (req: Request, res: Response) => {
  try {
    const {
      Business_ID,
      Branch_ID,
      Expected_Receive_Date,
      Special_Instruction,
      Items
    } = req.body;

    if (!Items || Items.length === 0) {
      return res.status(400).json({ message: "Order must contain items" });
    }

    const order = await OrderRequest.create({
      Business_ID,
      Branch_ID,
      //Store_Manager_ID: req.user._id,
      Expected_Receive_Date,
      Special_Instruction,
      Items,
      Order_Request_Number: `OR-${Date.now()}`,
      Status: OrderRequestStatus.CREATED
    });

    res.status(201).json({
      message: "Order request submitted successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to create order request", error });
  }
};

/* =====================================
   STORE MANAGER – MY ORDER REQUESTS
===================================== */
export const getMyOrderRequests = async (req: Request, res: Response) => {
  try {
    const orders = await OrderRequest.find({
      Store_Manager_ID: req.user._id
    })
      .sort({ createdAt: -1 })
      .populate("Branch_ID")
      .populate("Items.Product_Variant_ID");

    res.json({ data: orders });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
