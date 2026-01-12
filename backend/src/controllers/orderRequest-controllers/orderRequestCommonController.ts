import { Request, Response } from "express";
import OrderRequest from "../../models/OrderRequest";

export const getOrderRequestById = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await OrderRequest.findById(req.params.id)
      .populate("Store_Manager_ID", "name email")
      .populate("Branch_ID")
      .populate("Admin_Responded_By", "name email")
      .populate({
        path: "Items.Product_Variant_ID",
        populate: [
          {
            path: "Product_ID",
            model: "Product",
            select: "Product_Name"
          },
          {
            path: "Brand_ID",
            model: "Brand",
            select: "Brand_Name"
          }
        ]
      })
      .lean()       // ✅ CRITICAL
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ data: order });

  } catch (error) {
    console.error("ORDER FETCH ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch order",
      error
    });
  }
};
