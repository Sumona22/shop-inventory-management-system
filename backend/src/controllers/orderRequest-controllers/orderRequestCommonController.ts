import { Request, Response } from "express";
import OrderRequest from "../../models/OrderRequest";

/* =====================================
   GET ORDER REQUEST BY ID
===================================== */
export const getOrderRequestById = async (req: Request, res: Response) => {
  try {
    const order = await OrderRequest.findById(req.params.id)
      .populate("Store_Manager_ID", "name email")
      .populate("Branch_ID")
      .populate("Items.Product_Variant_ID")
      .populate("Admin_Responded_By", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ data: order });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error });
  }
};
