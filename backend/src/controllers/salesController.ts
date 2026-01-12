import { Request, Response } from "express";
import mongoose from "mongoose";

import Sale from "../models/Sale";
import SaleItem from "../models/SaleItem";
import BranchStock from "../models/stock-models/BranchStock";
import ProductVariant from "../models/product-models/ProductVariant";
import Product from "../models/product-models/Product";

// create sales by cashier
export const createSale = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      Business_ID,
      Branch_ID,
      Customer_Name,
      Customer_Phone,
      Payment_Mode,
      Discount = 0,
      items, 
      // [{ ProductVariant_ID, Quantity, Selling_Price, Tax_Percentage }]
    } = req.body;

    if (!Branch_ID || !items || items.length === 0) {
      throw new Error("Invalid sale data");
    }

    let Total_Amount = 0;
    let Total_Tax = 0;

    // 1️⃣ Create Sale first (invoice header)
    const sale = await Sale.create(
      [{
        Business_ID,
        Branch_ID,
        Cashier_User_ID: req.user!.id,
        Invoice_Number: `INV-${Date.now()}`,
        Customer_Name,
        Customer_Phone,
        Payment_Mode,
        Total_Amount: 0,
        Total_Tax: 0,
        Discount,
        Grand_Total: 0,
      }],
      { session }
    );

    // 2️⃣ Process each sale item
    for (const i of items) {
      const variant = await ProductVariant.findById(i.ProductVariant_ID).session(session);
      if (!variant) throw new Error("Variant not found");

      const product = await Product.findById(variant.Product_ID).session(session);
      if (!product) throw new Error("Product not found");

      let remainingQty = i.Quantity;

      // FIFO batch stock
      const stocks = await BranchStock.find({
        Branch_ID,
        ProductVariant_ID: variant._id,
        Quantity: { $gt: 0 },
      })
        .sort({ Created_At: 1 })
        .session(session);

      const available = stocks.reduce((s, b) => s + b.Quantity, 0);
      if (available < remainingQty) {
        throw new Error("Insufficient stock");
      }

      // 3️⃣ Deduct stock batch-wise
      for (const stock of stocks) {
        if (remainingQty === 0) break;

        const deduct = Math.min(stock.Quantity, remainingQty);
        stock.Quantity -= deduct;
        remainingQty -= deduct;

        await stock.save({ session });

        const lineAmount = deduct * i.Selling_Price;
        const taxAmount = (lineAmount * i.Tax_Percentage) / 100;

        Total_Amount += lineAmount;
        Total_Tax += taxAmount;

        // 4️⃣ Create SaleItem (analytics snapshot)
        await SaleItem.create(
          [{
            Sale_ID: sale[0]._id,
            Business_ID,
            Branch_ID,
            Product_ID: product._id,
            ProductVariant_ID: variant._id,
            Category_ID: product.Category_ID,
            Brand_ID: variant.Brand_ID,
            Batch_ID: stock.Batch_ID,
            Quantity: deduct,
            Cost_Price: stock.Cost_Price,
            Selling_Price: i.Selling_Price,
            Tax_Percentage: i.Tax_Percentage,
            Line_Total: lineAmount + taxAmount,
          }],
          { session }
        );
      }
    }

    // 5️⃣ Final totals
    sale[0].Total_Amount = Total_Amount;
    sale[0].Total_Tax = Total_Tax;
    sale[0].Grand_Total = Total_Amount + Total_Tax - Discount;

    await sale[0].save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      Sale_ID: sale[0]._id,
      Invoice_Number: sale[0].Invoice_Number,
    });

  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, message: error.message });
  }
};

// get sales report admin store manager
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
    .populate("Product_ID ProductVariant_ID Category_ID Brand_ID")
    .sort({ Created_At: -1 });

  res.json(data);
};


// get sales analytics admin manager
export const getSalesAnalytics = async (req: Request, res: Response) => {
  const { Branch_ID, groupBy = "day" } = req.query;

  let format = "%Y-%m-%d";
  if (groupBy === "month") format = "%Y-%m";
  if (groupBy === "year") format = "%Y";

  const match: any = {};
  if (Branch_ID) match.Branch_ID = new mongoose.Types.ObjectId(Branch_ID as string);

  const analytics = await SaleItem.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format, date: "$Created_At" } },
        Total_Sales: { $sum: "$Line_Total" },
        Quantity_Sold: { $sum: "$Quantity" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(analytics);
};
