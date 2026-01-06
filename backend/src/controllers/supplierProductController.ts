import { Request, Response } from "express";
import SupplierProduct from "../models/SupplierProduct";
import Supplier from "../models/Supplier";
import ProductVariant from "../models/product-models/ProductVariant";
import User from "../models/User";

/* ================================
   Add Product Variant to Supplier
   ================================ */
export const addSupplierProduct = async (req: Request, res: Response) => {
  try {
    const {
      Supplier_ID,
      ProductVariant_ID,
      Supplier_Price,
      Min_Order_Qty,
      Lead_Time_Days,
    } = req.body;

    const requester = await User.findById((req as any).user.id);

    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can manage supplier catalog" });
    }

    /* Validate supplier */
    const supplier = await Supplier.findOne({
      _id: Supplier_ID,
      Business_ID: requester.Business_ID,
      Is_Active: true,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found or inactive" });
    }

    /* Validate product variant */
    const productVariant = await ProductVariant.findOne({
      _id: ProductVariant_ID,
      Business_ID: requester.Business_ID,
    });

    if (!productVariant) {
      return res.status(404).json({ message: "Product variant not found" });
    }

    /* Create mapping */
    const supplierProduct = await SupplierProduct.create({
      Business_ID: requester.Business_ID,
      Supplier_ID,
      ProductVariant_ID,
      Supplier_Price,
      Min_Order_Qty,
      Lead_Time_Days,
      Is_Active: true,
    });

    return res.status(201).json({
      message: "Product added to supplier catalog",
      supplierProduct,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This supplier already supplies this product variant",
      });
    }

    console.error("Add SupplierProduct Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* =====================================
   Get Supplier Catalog (by Supplier)
   ===================================== */
export const getSupplierCatalog = async (req: Request, res: Response) => {
  try {
    const { supplierId } = req.params;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only Admin allowed" });
    }

    const catalog = await SupplierProduct.find({
      Supplier_ID: supplierId,
      Business_ID: requester.Business_ID,
      Is_Active: true,
    })
      .populate({
        path: "ProductVariant_ID",
        populate: [
          { path: "Product_ID", select: "Product_Name Category_ID" },
          { path: "Brand_ID", select: "Brand_Name" },
        ],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(catalog);
  } catch (error) {
    console.error("Get Supplier Catalog Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* =====================================
   Search Suppliers by Product / Brand /
   Category / SKU
   ===================================== */
export const searchSuppliers = async (req: Request, res: Response) => {
  try {
    const { productVariantId, brandId, categoryId, sku } = req.query;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only Admin allowed" });
    }

    const query: any = {
      Business_ID: requester.Business_ID,
      Is_Active: true,
    };

    if (productVariantId) {
      query.ProductVariant_ID = productVariantId;
    }

    const results = await SupplierProduct.find(query)
      .populate({
        path: "Supplier_ID",
        select: "Supplier_Name Supplier_Email Supplier_Address Supplier_Phone",
      })
      .populate({
        path: "ProductVariant_ID",
        match: sku ? { SKU_Normalized: sku } : {},
        populate: [
          { path: "Product_ID", match: categoryId ? { Category_ID: categoryId } : {} },
          { path: "Brand_ID", match: brandId ? { _id: brandId } : {} },
        ],
      });

    /* Remove unmatched populated docs */
    const filtered = results.filter((r) => r.ProductVariant_ID);

    return res.status(200).json(filtered);
  } catch (error) {
    console.error("Search Suppliers Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
