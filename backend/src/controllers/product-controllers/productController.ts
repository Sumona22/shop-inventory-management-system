import { Request, Response } from "express";
import User from "../../models/User";
import Category from "../../models/product-models/Category";
import Product from "../../models/product-models/Product";

/* Create Product */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { Category_ID, Product_Name, Product_Description } = req.body;

    const requester = await User.findById((req as any).user.id);

    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only admin can create product" });
    }

    const category = await Category.findOne({
      _id: Category_ID,
      Business_ID: requester.Business_ID,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = await Product.create({
      Business_ID: requester.Business_ID,
      Category_ID,
      Product_Name,
      Product_Description,
    });

    res.status(201).json({
      message: "Product created succesfully",
      Product_ID: product._id,
    });

  }
  catch (err: any) {
    res.status(400).json({
      message: "Product creation failed",
      error: err.message,
    });
  }

}

/* Get Products Category-wise or All */

export const getProducts = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);

    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filter: any = { Business_ID: requester.Business_ID };

    if (req.query.categoryId) {
      filter.Category_ID = req.query.categoryId;
    }

    const products = await Product.find(filter).populate("Category_ID", "Category_Name").sort({ Product_Name: 1 });
    res.status(200).json(products);

  }
  catch (err: any) {
    res.status(400).json({
      message: "Failed to fetch products",
      error: err.message,
    })
  }

}

/* Update Product */

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { Product_Name, Product_Description } = req.body;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(401).json({ message: "Only admin can update products" });
    }

    const product = await Product.findOne({
      _id: productId,
      Business_ID: requester.Business_ID,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (Product_Name !== undefined) product.Product_Name = Product_Name;
    if (Product_Description !== undefined) product.Product_Description = Product_Description;

    await product.save();

    res.status(200).json({
      message: "Product updated sucessfully",
      Product_ID: product._id,
    });

  }
  catch (err: any) {
    res.status(500).json({
      message: "Failed to update products",
      error: err.message,
    })
  }
}