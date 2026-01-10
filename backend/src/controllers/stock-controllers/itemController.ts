import { Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../../models/stock-models/Item";
import ProductVariant from "../../models/product-models/ProductVariant";
import { incrementBranchStock } from "../../utils/updateBranchStock";

export const createItem = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { Product_Variant_ID, Item_No, Mfg_Date, Warranty_Expiry } = req.body;

    const productVariant = await ProductVariant.findOne({
      _id: Product_Variant_ID,
      Business_ID: req.user.Business_ID,
      Tracking_Type: "ITEM"

    });

    if (!productVariant) {
      return res.status(404).json({
        message: "Item tracking not enabled for this product variant",
      });
    }

    const item = await Item.create(
      [
        {
          Business_ID: req.user.Business_ID,
          Branch_ID: req.user.Branch_ID,
          Product_Variant_ID,
          Item_No,
          Mfg_Date,
          Warranty_Expiry,
        },
      ],
      { session }
    );

    await incrementBranchStock({
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Product_Variant_ID,
      quantity: 1,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Item added successfully",
      Item_ID: item[0]._id,
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};


/* Fetch ALL Items */

export const getItemsByBranch = async (req: any, res: Response) => {
  const items = await Item.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
  }).populate("Product_Variant_ID");

  res.status(200).json(items);
};



/* Fetch Item by Item_ID */

export const getItemById = async (req: any, res: Response) => {
  const item = await Item.findOne({
    _id: req.params.id,
    Business_ID: req.user.Business_ID,
  });

  if (!item) return res.status(404).json({ message: "Item not found" });

  res.status(200).json(item);
};

/* Update Item */

export const updateItem = async (req: any, res: Response) => {
  const updatedItem = await Item.findOneAndUpdate(
    {
      _id: req.params.id,
      Business_ID: req.user.Business_ID,
    },
    req.body,
    { new: true }
  );

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(updatedItem);
};
