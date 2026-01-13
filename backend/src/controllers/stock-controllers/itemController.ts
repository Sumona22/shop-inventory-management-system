import mongoose from "mongoose";
import { Response } from "express";
import Item from "../../models/stock-models/Item";
import ProductVariant from "../../models/product-models/ProductVariant";
import BranchProduct from "../../models/stock-models/BranchProduct";
import { incrementBranchStock } from "../../utils/updateBranchStock";

const itemPopulate = {
  path: "Branch_Product_ID",
  populate: {
    path: "Product_Variant_ID",
    select: "SKU SKU_Normalized Tracking_Type Brand_ID Product_ID",
    populate: [
      { path: "Brand_ID", select: "Brand_Name" },
      {
        path: "Product_ID",
        select: "Product_Name Category_ID",
        populate: { path: "Category_ID", select: "Category_Name" },
      },
    ],
  },
};

export const createItem = async (req: any, res: Response) => {
  if (req.user.Role !== "StoreStaff") {
    return res.status(403).json({ message: "Only store staff can create items" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { Branch_Product_ID, Item_No, Mfg_Date, Warranty_Expiry } = req.body;

    const branchProduct = await BranchProduct.findOne({
      _id: Branch_Product_ID,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
    }).session(session);

    if (!branchProduct) {
      return res.status(404).json({ message: "Branch product not found" });
    }

    const productVariant = await ProductVariant.findOne({
      _id: branchProduct.Product_Variant_ID,
      Tracking_Type: "ITEM",
    });

    if (!productVariant) {
      return res.status(400).json({ message: "Item tracking not enabled" });
    }

    const [item] = await Item.create(
      [{
        Business_ID: req.user.Business_ID,
        Branch_ID: req.user.Branch_ID,
        Branch_Product_ID,
        Item_No,
        Mfg_Date,
        Warranty_Expiry,
      }],
      { session }
    );

    await incrementBranchStock({
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Branch_Product_ID,
      quantity: 1,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Item created", Item_ID: item._id });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};


const allowedViewRoles = ["StoreManager", "StoreStaff", "Cashier"];

export const getItemsByBranch = async (req: any, res: Response) => {
  if (!allowedViewRoles.includes(req.user.Role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const items = await Item.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
  }).populate(itemPopulate);

  res.status(200).json(items);
};

export const getItemsByBranchProduct = async (req: any, res: Response) => {
  if (!allowedViewRoles.includes(req.user.Role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const items = await Item.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
    Branch_Product_ID: req.params.branchProductId,
  }).populate(itemPopulate);

  res.status(200).json(items);
};

export const getItemsBySKU = async (req: any, res: Response) => {
  if (!["StoreManager", "StoreStaff", "Cashier"].includes(req.user.Role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { productVariantId } = req.params;

  const items = await Item.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
  }).populate({
    path: "Branch_Product_ID",
    match: { Product_Variant_ID: productVariantId },
    populate: {
      path: "Product_Variant_ID",
      select: "SKU SKU_Normalized Tracking_Type Brand_ID Product_ID",
      populate: [
        { path: "Brand_ID", select: "Brand_Name" },
        {
          path: "Product_ID",
          select: "Product_Name Category_ID",
          populate: { path: "Category_ID", select: "Category_Name" },
        },
      ],
    },
  });

  // remove nulls caused by populate match
  const filteredItems = items.filter(i => i.Branch_Product_ID);

  res.status(200).json(filteredItems);
};


export const getItemById = async (req: any, res: Response) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
    }).populate({
      path: "Branch_Product_ID",
      populate: {
        path: "Product_Variant_ID",
        select: "SKU SKU_Normalized Tracking_Type Brand_ID Product_ID",
        populate: [
          { path: "Brand_ID", select: "Brand_Name" },
          {
            path: "Product_ID",
            select: "Product_Name Category_ID",
            populate: {
              path: "Category_ID",
              select: "Category_Name",
            },
          },
        ],
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch item",
      error: err.message,
    });
  }
};


export const updateItem = async (req: any, res: Response) => {
  try {
    const { Item_Status, Mfg_Date, Warranty_Expiry } = req.body;

    const item = await Item.findOne({
      _id: req.params.id,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    /* ===============================
       Allowed field updates ONLY
    =============================== */

    // 1️⃣ Item Status
    if (Item_Status !== undefined) {
      if (!Object.values(Item_Status).includes(Item_Status)) {
        return res.status(400).json({ message: "Invalid Item_Status value" });
      }

      item.Item_Status = Item_Status;
    }

    // 2️⃣ Manufacturing Date (correction allowed)
    if (Mfg_Date !== undefined) {
      item.Mfg_Date = Mfg_Date;
    }

    // 3️⃣ Warranty Expiry (correction allowed)
    if (Warranty_Expiry !== undefined) {
      item.Warranty_Expiry = Warranty_Expiry;
    }

    await item.save();

    res.status(200).json({
      message: "Item updated successfully",
      item,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to update item",
      error: err.message,
    });
  }
};
