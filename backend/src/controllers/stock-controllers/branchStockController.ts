import { Request, Response } from "express"
import User from "../../models/User";
import Branch from "../../models/Branch";
import ProductVariant from "../../models/product-models/ProductVariant";
import BranchStock from "../../models/stock-models/BranchStock";

const createBranchStock = async (req: Request, res: Response) => {
    try {
        const requester = await User.findById((res as any).used.id);

        if (!requester || requester.Role !== "StoreManager") {
            return res.status(403).json({ message: "Only store manager is allowed to create branch stock" });
        }

        const { Product_Variant_ID, Quantity } = req.body;

        const branch = await Branch.findOne({
            _id: requester.Branch_ID,
            Business_ID: requester.Business_ID,
        });

        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        const productVariant = await ProductVariant.findOne({
            _id: Product_Variant_ID,
            Business_ID: requester.Business_ID,
        });

        if (!productVariant) {
            return res.status(404).json({ message: "Product variant not found" });
        }

        const branchStock = await BranchStock.create({
            Business_ID: requester.Business_ID,
            Branch_ID: requester.Branch_ID,
            Product_Variant_ID,
            Quantity
        });

        res.status(201).json({
            message: "Branch stock added successfully",
            Branch_Stock_ID: branchStock._id,
        })
    }
    catch (err: any) {
        res.status(400).json({
            message: "Variant creation failed",
            error: err.message,
        });
    }
};