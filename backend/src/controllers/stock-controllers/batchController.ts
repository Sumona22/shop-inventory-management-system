import { Request, Response } from "express";
import mongoose from "mongoose";
import Batch from "../../models/stock-models/Batch";
import ProductVariant from "../../models/product-models/ProductVariant";
import { incrementBranchStock } from "../../utils/updateBranchStock";
import BranchProduct from "../../models/stock-models/BranchProduct";

/* Create Batch */
export const createBatch = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      Branch_Product_ID,
      Mfg_Date,
      Exp_Date,
      Quantity,
      Batch_Status,
    } = req.body;

    if (!Quantity || Quantity <= 0) {
      return res.status(400).json({ message: "Invalid batch quantity" });
    }

    /* Fetch BranchProduct */
    const branchProduct = await BranchProduct.findOne({
      _id: Branch_Product_ID,
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Is_Active: true,
    }).session(session);

    if (!branchProduct) {
      return res.status(404).json({
        message: "Branch product not found or inactive",
      });
    }

    /* Fetch ProductVariant */
    const productVariant = await ProductVariant.findOne({
      _id: branchProduct.Product_Variant_ID,
      Business_ID: req.user.Business_ID,
      Tracking_Type: "BATCH",
    });

    if (!productVariant) {
      return res.status(400).json({
        message: "Batch tracking not enabled for this product",
      });
    }

    /* Generate next batch number */
    const lastBatch = await Batch.findOne({
      Branch_ID: req.user.Branch_ID,
      Branch_Product_ID,
    })
      .sort({ Batch_No: -1 })
      .session(session);

    const nextBatchNo = lastBatch ? lastBatch.Batch_No + 1 : 1;

    /* Create batch code */
    const batchCode = `B-${productVariant.SKU_Normalized}-${nextBatchNo}`;

    /* Create batch */
    const batch = await Batch.create(
      [
        {
          Business_ID: req.user.Business_ID,
          Branch_ID: req.user.Branch_ID,
          Branch_Product_ID,
          Batch_No: nextBatchNo,
          Batch_Code: batchCode,
          Mfg_Date,
          Exp_Date,
          Quantity,
          Batch_Status,
        },
      ],
      { session }
    );

    /* Increment branch stock */
    await incrementBranchStock({
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Branch_Product_ID,
      quantity: Quantity,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Batch created successfully",
      Batch_ID: batch[0]._id,
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: "Failed to create batch",
      error: err.message,
    });
  }
};

/* Fetch Batches By Branch */
export const getBatchesByBranch = async (req: any, res: Response) => {
  try {
    const batches = await Batch.find({
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
    }).populate({
      path: "Branch_Product_ID",
      populate: {
        path: "Product_Variant_ID Product_ID",
      },
    });

    res.status(200).json(batches);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch batches",
      error: err.message,
    });
  }
};

/* Fetch Batch by ID */
export const getBatchById = async (req: any, res: Response) => {
  try {
    const batch = await Batch.findOne({
      _id: req.params.id,
      Business_ID: req.user.Business_ID,
    }).populate({
      path: "Branch_Product_ID",
      populate: {
        path: "Product_Variant_ID Product_ID",
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

/* Update Batch Details */
export const updateBatch = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await Batch.findOne({
      _id: req.params.id,
      Business_ID: req.user.Business_ID,
    }).session(session);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const oldQty = batch.Quantity;
    const newQty = req.body.Quantity;

    if (newQty !== undefined && newQty !== oldQty) {
      const diff = newQty - oldQty;

      await incrementBranchStock({
        Business_ID: req.user.Business_ID,
        Branch_ID: batch.Branch_ID,
        Branch_Product_ID: batch.Branch_Product_ID, // ✅ FIXED
        quantity: diff,
        session,
      });
    }

    Object.assign(batch, req.body);
    await batch.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(batch);
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: "Failed to update batch",
      error: err.message,
    });
  }
};
