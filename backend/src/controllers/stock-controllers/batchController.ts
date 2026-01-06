import { Request, Response } from "express"
import User from "../../models/User";
import Branch from "../../models/Branch";
import ProductVariant from "../../models/product-models/ProductVariant";
import BranchStock from "../../models/stock-models/BranchStock";

const createBatch = async (req: Request, res: Response) => {
    try {
        const requester = await User.findById((res as any).used.id);

        if (!requester || requester.Role !== "StoreManager") {
            return res.status(403).json({ message: "Only store manager is allowed to create branch stock" });
        }

    }
    catch (err: any) {
        res.status(400).json({
            message: "Variant creation failed",
            error: err.message,
        });
    }
};