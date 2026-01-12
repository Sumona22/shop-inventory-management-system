import { Request, Response } from "express";
import User from "../../models/User";
import Business from "../../models/Business";
import Brand from "../../models/product-models/Brand";

/* Create Brand */

export const createBrand = async (req: Request, res: Response) => {
    try {
        const { Brand_Name, Brand_Description } = req.body;
        const requester = await User.findById((req as any).user.id);
        const Business_ID = requester?.Business_ID;

        if (!requester || requester.Role !== "Admin") {
            return res.status(403).json({ message: "Only admin can create brand" });
        }

        const business = await Business.findById(Business_ID);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const brand = await Brand.create({
            Business_ID: business._id,
            Brand_Name,
            Brand_Description,
        });

        res.status(201).json({
            message: "Brand created successfully",
            Brand_ID: brand._id,
        });
    } catch (err: any) {
        res.status(400).json({
            message: "Brand creation failed",
            error: err.message,
        });
    }
};

/* Get All Brands */

export const getBrands = async (req: Request, res: Response) => {
    try {
        const requester = await User.findById((req as any).user.id);

        if (!requester) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const brands = await Brand.find({
            Business_ID: requester.Business_ID,
        }).sort({ Brand_Name: 1 });

        res.status(200).json(brands);
    } catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch brands",
            error: err.message,
        });
    }
};

/* Get Brand by ID */

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { brandId } = req.params;
        const requester = await User.findById((req as any).user.id);

        if (!requester) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const brand = await Brand.findOne({
            _id: brandId,
            Business_ID: requester.Business_ID,
        });

        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        res.status(200).json(brand);
    } catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch brand",
            error: err.message,
        });
    }
};

/* Update Brand */

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const { brandId } = req.params;
        const { Brand_Name, Brand_Description } = req.body;

        const requester = await User.findById((req as any).user.id);

        if (!requester || requester.Role !== "Admin") {
            return res.status(403).json({ message: "Only admin can update brand" });
        }

        const brand = await Brand.findOne({
            _id: brandId,
            Business_ID: requester.Business_ID,
        });

        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        if (Brand_Name !== undefined) brand.Brand_Name = Brand_Name;
        if (Brand_Description !== undefined)
            brand.Brand_Description = Brand_Description;

        await brand.save();

        res.status(200).json({
            message: "Brand updated successfully",
            Brand_ID: brand._id,
        });
    } catch (err: any) {
        res.status(400).json({
            message: "Brand update failed",
            error: err.message,
        });
    }
};
