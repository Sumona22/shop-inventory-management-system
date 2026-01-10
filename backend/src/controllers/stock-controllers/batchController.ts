import { Request, Response } from "express";
import mongoose from "mongoose";
import Batch from "../../models/stock-models/Batch";
import ProductVariant from "../../models/product-models/ProductVariant";
import { incrementBranchStock } from "../../utils/updateBranchStock";

/* Create Batch */

export const createBatch = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { Product_Variant_ID, Mfg_Date, Exp_Date, Quantity, Batch_Status } = req.body;

    if (!Quantity || Quantity <= 0) {
      return res.status(400).json({ message: "Invalid batch quantity" });
    }

    const productVariant = await ProductVariant.findOne({
      _id: Product_Variant_ID,
      Business_ID: req.user.Business_ID,
      Tracking_Type: "BATCH"

    });

    if (!productVariant) {
      return res.status(404).json({
        message: "Batch tracking not enabled for this product variant",
      });
    }

    const lastBatch = await Batch.findOne({
      Branch_ID: req.user.Branch_ID,
      Product_Variant_ID,
    })
      .sort({ Batch_No: -1 })
      .session(session);

    const nextBatchNo = lastBatch ? lastBatch.Batch_No + 1 : 1;

    const batchCode = `B-${productVariant.SKU_Normalized}-${nextBatchNo}`;


    const batch = await Batch.create(
      [
        {
          Business_ID: req.user.Business_ID,
          Branch_ID: req.user.Branch_ID,
          Product_Variant_ID,
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

    await incrementBranchStock({
      Business_ID: req.user.Business_ID,
      Branch_ID: req.user.Branch_ID,
      Product_Variant_ID,
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
    res.status(500).json({ message: err.message });
  }
};

/* Fetch Batches */

export const getBatchesByBranch = async (req: any, res: Response) => {
  const batches = await Batch.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: req.user.Branch_ID,
  }).populate("Product_Variant_ID");

  res.status(200).json(batches);
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
        Product_Variant_ID: batch.Product_Variant_ID,
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
    res.status(500).json({ message: err.message });
  }
};

