import { Request, Response } from "express"
import User from "../../models/User";
import Business from "../../models/Business";
import Category from "../../models/product-models/Category";

/* Create Category */

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { Business_ID, Category_Name, Category_Description } = req.body;
        const requester = await User.findById((req as any).user.id);

        if (!requester || requester.Role !== "Admin") {
            return res.status(403).json({ message: "Only admin can create category" });
        }

        if (requester.Business_ID?.toString() !== Business_ID) {
            return res.status(403).json({ message: "Admin can only create categories for their own business" });
        }

        const business = await Business.findById(Business_ID);
        if (!business) return res.status(404).json({ message: "Business not found" });


        const category = await Category.create({
            Business_ID: business._id,
            Category_Name,
            Category_Description,
        });
        res.status(201).json({
            message: "Category created successfully",
            Category_ID: category._id,
        });
    }
    catch (err: any) {
        console.error(err);
        res.status(400).json({
            message: "Category creation failed",
            error: err.message,
        });
    }
}

/* Get All Categories */

export const getCategories = async (req: Request, res: Response) => {
    try {
        const requester = await User.findById((req as any).user.id);
        if (!requester) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const businessId = requester.Business_ID;

        const categories = await Category.find({ Business_ID: businessId })
            .sort({ Category_Name: 1 }); // alphabetical

        res.status(200).json(categories);
    } catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch categories",
            error: err.message,
        });
    }
};

/* Get Category by ID */

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const requester = await User.findById((req as any).user.id);

        if (!requester) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const category = await Category.findOne({
            _id: categoryId,
            Business_ID: requester.Business_ID,
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch category",
            error: err.message,
        });
    }
};

/* Update Category */

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const { Category_Name, Category_Description } = req.body;

        const requester = await User.findById((req as any).user.id);

        if (!requester || requester.Role !== "Admin") {
            return res.status(403).json({ message: "Only admin can update category" });
        }

        const category = await Category.findOne({
            _id: categoryId,
            Business_ID: requester.Business_ID,
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (Category_Name !== undefined) category.Category_Name = Category_Name;
        if (Category_Description !== undefined)
            category.Category_Description = Category_Description;

        await category.save();

        res.status(200).json({
            message: "Category updated successfully",
            Category_ID: category._id,
        });
    } catch (err: any) {
        res.status(400).json({
            message: "Category update failed",
            error: err.message,
        });
    }
};
