import { Request, Response } from "express";
import mongoose from "mongoose";

import Order, { Order_Status } from "../models/Order";
import Supplier from "../models/Supplier";
import User from "../models/User";
import Business from "../models/Business";

export const addSupplier = async (req: Request, res: Response) => {
    try {
        const {
            Supplier_Name,
            Supplier_Email,
            Supplier_Phone,
            Supplier_Address,
            GST_Number,
            Notes,
            Business_ID
        } = req.body;

        /* Auth check */
        const requester = await User.findById((req as any).user.id);

        if (!requester || requester.Role !== "Admin") {
            return res.status(403).json({
                message: "Only Admin can add suppliers"
            });
        }

        /* Business ownership check */
        if (requester.Business_ID?.toString() !== Business_ID) {
            return res.status(403).json({
                message: "Admin can only add suppliers for own business"
            });
        }

        /* Business existence check */
        const business = await Business.findById(Business_ID);
        if (!business) {
            return res.status(404).json({
                message: "Business not found"
            });
        }

        /* Duplicate supplier check (business scoped) */
        const existingSupplier = await Supplier.findOne({
            Supplier_Email,
            Business_ID
        });

        if (existingSupplier) {
            return res.status(409).json({
                message: "Supplier already exists for this business"
            });
        }

        /* Create supplier */
        const supplier = await Supplier.create({
            Supplier_Name,
            Supplier_Email,
            Supplier_Phone,
            Supplier_Address,
            GST_Number,
            Notes,
            Admin_User_ID: requester._id,
            Business_ID,
            Is_Active: true
        });

        return res.status(201).json({
            message: "Supplier added successfully",
            supplier
        });

    } catch (error) {
        console.error("Add Supplier Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);

    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can view suppliers",
      });
    }

    const suppliers = await Supplier.find({
      Business_ID: requester.Business_ID,
      Is_Active: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json(suppliers);
  } catch (error) {
    console.error("Get Suppliers Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const supplier = await Supplier.findOne({
      _id: req.params.id,
      Business_ID: requester.Business_ID,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const supplier = await Supplier.findOneAndUpdate(
      {
        _id: req.params.id,
        Business_ID: requester.Business_ID,
      },
      req.body,
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({
      message: "Supplier updated",
      supplier,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
