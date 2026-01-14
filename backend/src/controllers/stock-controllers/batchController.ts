import { Response } from "express";
import mongoose from "mongoose";
import Batch from "../../models/stock-models/Batch";
import ProductVariant from "../../models/product-models/ProductVariant";
import BranchProduct from "../../models/stock-models/BranchProduct";
import { incrementBranchStock } from "../../utils/updateBranchStock";
import crypto from "crypto";

/* ===================== CREATE BATCH ===================== */
export const createBatch = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { Branch_Product_ID, Mfg_Date, Exp_Date, Quantity } = req.body;

    if (!Quantity || Quantity <= 0) {
      return res.status(400).json({ message: "Invalid batch quantity" });
    }

    const branchProduct = await BranchProduct.findOne({
      _id: Branch_Product_ID,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Is_Active: true,
    }).session(session);

    if (!branchProduct) {
      return res.status(404).json({ message: "Branch product not found" });
    }

    const productVariant = await ProductVariant.findById(
    branchProduct.Product_Variant_ID
  );

    if (!productVariant) {
      return res.status(404).json({ message: "Product variant not found" });
    }

    if (productVariant.Tracking_Type !== "BATCH") {
      return res
        .status(400)
        .json({ message: "Batch tracking not enabled for this SKU" });
    }

    const batchCode = `B-${productVariant.SKU}-${crypto
      .randomBytes(4)
      .toString("hex")}`;

    await Batch.create(
      [
        {
          Business_ID: req.user.Business_ID,
          Branch_ID: req.user.Branch_ID,
          Branch_Product_ID,
          Batch_Code: batchCode,
          Mfg_Date,
          Exp_Date,
          Quantity,
        },
      ],
      { session }
    );

    await incrementBranchStock({
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Branch_Product_ID,
      quantity: Quantity,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Batch created successfully" });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};

const allowedViewRoles = ["StoreManager", "StoreStaff", "Cashier"];

const batchPopulate = {
  path: "Branch_Product_ID",
  populate: {
    path: "Product_Variant_ID",
    select: "SKU SKU_Normalized Tracking_Type Pack_Size Unit Brand_ID Product_ID",
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

/* Fetch all batches for logged-in branch */
export const getBatchesByBranch = async (req: any, res: Response) => {
  if (!allowedViewRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const batches = await Batch.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
  }).populate(batchPopulate);

  res.status(200).json(batches);
};

/* Fetch batches by BranchProduct */
export const getBatchesByBranchProduct = async (req: any, res: Response) => {
  if (!allowedViewRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const batches = await Batch.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
    Branch_Product_ID: req.params.branchProductId,
  }).populate(batchPopulate);

  res.status(200).json(batches);
};

export const getBatchesBySKU = async (req: any, res: Response) => {
  if (!["StoreManager", "StoreStaff", "Cashier"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { productVariantId } = req.params;

  const batches = await Batch.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
  }).populate({
    path: "Branch_Product_ID",
    match: { Product_Variant_ID: productVariantId },
    populate: {
      path: "Product_Variant_ID",
      select: "SKU SKU_Normalized Tracking_Type Pack_Size Unit Brand_ID Product_ID",
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

  // Remove non-matching results (populate match returns null)
  const filteredBatches = batches.filter(b => b.Branch_Product_ID);

  res.status(200).json(filteredBatches);
};




export const getBatchById = async (req: any, res: Response) => {
  try {
    const { batchId } = req.params;

    // Allowed: StoreStaff, StoreManager, Cashier (already enforced by route)
    const batch = await Batch.findOne({
      _id: batchId,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
    }).populate({
      path: "Branch_Product_ID",
      populate: {
        path: "Product_Variant_ID",
        select: "SKU SKU_Normalized Tracking_Type Pack_Size Unit Brand_ID Product_ID",
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

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json(batch);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch batch",
      error: err.message,
    });
  }
};


export const updateBatch = async (req: any, res: Response) => {
  if (req.user.Role !== "StoreStaff") {
    return res.status(403).json({ message: "Only store staff can update batches" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { Quantity, Mfg_Date, Exp_Date } = req.body;

    const batch = await Batch.findOne({
      _id: req.params.batchId,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
    }).session(session);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Quantity adjustment → affects branch stock
    if (Quantity !== undefined && Quantity !== batch.Quantity) {
      await incrementBranchStock({
        Business_ID: req.user.Business_ID,
        Branch_ID: batch.Branch_ID,
        Branch_Product_ID: batch.Branch_Product_ID,
        quantity: Quantity - batch.Quantity,
        session,
      });

      batch.Quantity = Quantity;
    }

    // Metadata corrections
    if (Mfg_Date !== undefined) {
      batch.Mfg_Date = Mfg_Date;
    }

    if (Exp_Date !== undefined) {
      batch.Exp_Date = Exp_Date;
    }

    await batch.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Batch updated successfully",
      batch,
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};
