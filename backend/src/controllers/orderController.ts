import { Request, Response } from "express";
import mongoose from "mongoose";

import Order, { Order_Status } from "../models/Order";
import Supplier from "../models/Supplier";
import User from "../models/User";
import Business from "../models/Business";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const {
            Order_Number,
            Business_ID,
            Supplier_ID,
            Items,
            Notes
        } = req.body;

        /* Auth check */
        const requester = await User.findById((req as any).user.id);

        if (!requester || requester.Role !== "Admin") {
            return res.status(403).json({
                message: "Only Admin can create orders"
            });
        }

        /* Business ownership check */
        if (requester.Business_ID?.toString() !== Business_ID) {
            return res.status(403).json({
                message: "Admin can only create orders for own business"
            });
        }

        /* Business validation */
        const business = await Business.findById(Business_ID);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        /* Supplier validation */
        const supplier = await Supplier.findOne({
            _id: Supplier_ID,
            Business_ID,
            Is_Active: true
        });

        if (!supplier) {
            return res.status(404).json({
                message: "Supplier not found or inactive"
            });
        }

        /* Create Order */
        const order = await Order.create({
            Order_Number,
            Admin_User_ID: requester._id,
            Business_ID,

            Supplier_Snapshot: {
                Supplier_Name: supplier.Supplier_Name,
                Supplier_Email: supplier.Supplier_Email,
                Supplier_Phone: supplier.Supplier_Phone,
                Supplier_Address: supplier.Supplier_Address,
                GST_Number: supplier.GST_Number
            },

            Items,

            Order_Status: Order_Status.PLACED,
            Notes
        });

        return res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
