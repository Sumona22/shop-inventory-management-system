import { Request, Response } from "express";
import mongoose from "mongoose";

import Sale from "../models/Sale";
import SaleItem from "../models/SaleItem";
import Batch, { Batch_Status } from "../models/stock-models/Batch";
import BranchProduct from "../models/stock-models/BranchProduct";
import ProductVariant from "../models/product-models/ProductVariant";
import Product from "../models/product-models/Product";

/* ======================================================
   CREATE SALE (Cashier)
   - FIFO by Exp_Date
   - Batch-based stock deduction
   - BranchStock NOT touched here
====================================================== */
export const createSale = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      Payment_Mode,
      Customer_Name,
      Customer_Phone,
      Discount = 0,
      items,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No sale items provided" });
    }

    const Business_ID = req.user.Business_ID;
    const Branch_ID = req.user.Branch_ID;

    let Total_Amount = 0;
    let Total_Tax = 0;

    /* 1️⃣ Create Sale header */
    const [sale] = await Sale.create(
      [
        {
          Business_ID,
          Branch_ID,
          Cashier_User_ID: req.user.id,
          Invoice_Number: `INV-${Date.now()}`,
          Customer_Name,
          Customer_Phone,
          Payment_Mode,
          Total_Amount: 0,
          Total_Tax: 0,
          Discount,
          Grand_Total: 0,
        },
      ],
      { session }
    );

    /* 2️⃣ Process each item */
    for (const item of items) {
      const variant = await ProductVariant.findById(
        item.ProductVariant_ID
      ).session(session);
      if (!variant) throw new Error("Product variant not found");

      const product = await Product.findById(
        variant.Product_ID
      ).session(session);
      if (!product) throw new Error("Product not found");

      const branchProduct = await BranchProduct.findOne({
        Business_ID,
        Branch_ID,
        Product_Variant_ID: variant._id,
        Is_Active: true,
      }).session(session);

      if (!branchProduct) {
        throw new Error(`Product not enabled for branch: ${variant.SKU}`);
      }

      let remainingQty = item.Quantity;

      /* 3️⃣ FIFO batches by expiry */
      const batches = await Batch.find({
        Business_ID,
        Branch_ID,
        Branch_Product_ID: branchProduct._id,
        Batch_Status: Batch_Status.ACTIVE,
        Quantity: { $gt: 0 },
      })
        .sort({ Exp_Date: 1, createdAt: 1 })
        .session(session);

      const availableQty = batches.reduce(
        (sum, b) => sum + b.Quantity,
        0
      );

      if (availableQty < remainingQty) {
        throw new Error(`Insufficient stock for ${variant.SKU}`);
      }

      /* 4️⃣ Deduct batch-wise */
      for (const batch of batches) {
        if (remainingQty <= 0) break;

        const deduct = Math.min(batch.Quantity, remainingQty);
        batch.Quantity -= deduct;
        remainingQty -= deduct;

        if (batch.Quantity === 0) {
          batch.Batch_Status = Batch_Status.DEPLETED;
        }

        await batch.save({ session });

        const lineAmount = deduct * item.Selling_Price;
        const taxAmount = (lineAmount * item.Tax_Percentage) / 100;

        Total_Amount += lineAmount;
        Total_Tax += taxAmount;

        /* 5️⃣ Create SaleItem snapshot */
        await SaleItem.create(
          [
            {
              Sale_ID: sale._id,
              Business_ID,
              Branch_ID,
              Product_ID: product._id,
              ProductVariant_ID: variant._id,
              Category_ID: product.Category_ID,
              Brand_ID: variant.Brand_ID,
              Batch_ID: batch._id,
              Quantity: deduct,
              Selling_Price: item.Selling_Price,
              Tax_Percentage: item.Tax_Percentage,
              Line_Total: lineAmount + taxAmount,
            },
          ],
          { session }
        );
      }
    }

    /* 6️⃣ Final totals */
    sale.Total_Amount = Total_Amount;
    sale.Total_Tax = Total_Tax;
    sale.Grand_Total = Total_Amount + Total_Tax - Discount;

    await sale.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      Sale_ID: sale._id,
      Invoice_Number: sale.Invoice_Number,
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


/* ======================================================
   SALES REPORT (Admin / Store Manager)
   - Used by table view
====================================================== */
export const getSalesReport = async (req: Request, res: Response) => {
  const {
    Branch_ID,
    Product_ID,
    Category_ID,
    Brand_ID,
    ProductVariant_ID,
    startDate,
    endDate,
  } = req.query;

  const filter: any = {};

  if (Branch_ID) filter.Branch_ID = Branch_ID;
  if (Product_ID) filter.Product_ID = Product_ID;
  if (Category_ID) filter.Category_ID = Category_ID;
  if (Brand_ID) filter.Brand_ID = Brand_ID;
  if (ProductVariant_ID) filter.ProductVariant_ID = ProductVariant_ID;

  if (startDate && endDate) {
    filter.Created_At = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    };
  }

  const data = await SaleItem.find(filter)
    .populate("Product_ID ProductVariant_ID Category_ID Brand_ID Batch_ID")
    .sort({ Created_At: -1 });

  res.json(data);
};

/* ======================================================
   SALES ANALYTICS (Charts)
   - day / month / year
====================================================== */
export const getSalesAnalytics = async (req: Request, res: Response) => {
  const { Branch_ID, groupBy = "day" } = req.query;

  let format = "%Y-%m-%d";
  if (groupBy === "month") format = "%Y-%m";
  if (groupBy === "year") format = "%Y";

  const match: any = {};
  if (Branch_ID) {
    match.Branch_ID = new mongoose.Types.ObjectId(Branch_ID as string);
  }

  const analytics = await SaleItem.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          $dateToString: { format, date: "$Created_At" },
        },
        Total_Sales: { $sum: "$Line_Total" },
        Quantity_Sold: { $sum: "$Quantity" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(analytics);
};
