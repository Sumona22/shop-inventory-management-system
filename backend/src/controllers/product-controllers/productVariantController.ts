import { Request, Response } from "express";
import Brand from "../../models/product-models/Brand";
import Product from "../../models/product-models/Product";
import ProductVariant from "../../models/product-models/ProductVariant";
import User from "../../models/User";
import { normalizeSKU } from "../../utils/skuUtils";


/* Create Product Variant */
export const createProductVariant = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only admin is allowed to create product variant" });
    }

    const {
      Product_ID,
      Brand_ID,
      SKU,
      Pack_Size,
      Unit,
      Price,
      Attributes,
      Tracking_Type,
    } = req.body;

    const product = await Product.findOne({
      _id: Product_ID,
      Business_ID: requester.Business_ID,
    });

    const brand = await Brand.findOne({
      _id: Brand_ID,
      Business_ID: requester.Business_ID,
    });

    if (!product || !brand) {
      return res.status(404).json({ message: "Product or Brand not found" });
    }

    const SKU_Normalized = normalizeSKU(SKU);



    const productVariant = await ProductVariant.create({
      Business_ID: requester.Business_ID,
      Product_ID,
      Brand_ID,
      SKU,
      SKU_Normalized,
      Pack_Size,
      Unit,
      Price,
      Attributes,
      Tracking_Type
    });

    res.status(201).json({
      message: "Product variant created",
      Product_Variant_ID: productVariant._id,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Variant creation failed",
      error: err.message,
    });
  }
};

/* Get Product Variants */

export const getProductVariants = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);
    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filter: any = {
      Business_ID: requester.Business_ID,
    };

    /* ===== FILTER BY CATEGORY ===== */
    if (req.query.categoryId) {
      const products = await Product.find(
        {
          Business_ID: requester.Business_ID,
          Category_ID: req.query.categoryId,
        },
        { _id: 1 }
      );

      const productIds = products.map((p) => p._id);

      // No products → no variants
      if (productIds.length === 0) {
        return res.status(200).json([]);
      }

      filter.Product_ID = { $in: productIds };
    }

    if (req.query.productId) {
      filter.Product_ID = req.query.productId;
    }

    if (req.query.brandId) {
      filter.Brand_ID = req.query.brandId;
    }

    const variants = await ProductVariant.find(filter)
      .populate({
        path: "Product_ID",
        select: "Product_Name Category_ID",
        populate: {
          path: "Category_ID",
          select: "Category_Name",
        },
      })
      .populate("Brand_ID", "Brand_Name");

    res.status(200).json(variants);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch variants",
      error: err.message,
    });
  }
};

/* Get Single Product Variant By ID */
export const getProductVariantById = async (
  req: Request,
  res: Response
) => {
  try {
    const { variantId } = req.params;

    const requester = await User.findById((req as any).user.id);
    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const variant = await ProductVariant.findOne({
      _id: variantId,
      Business_ID: requester.Business_ID,
    })
      .populate({
        path: "Product_ID",
        select: "Product_Name Category_ID",
        populate: {
          path: "Category_ID",
          select: "Category_Name",
        },
      })
      .populate("Brand_ID", "Brand_Name");

    if (!variant) {
      return res.status(404).json({
        message: "Product variant not found",
      });
    }

    res.status(200).json(variant);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch product variant",
      error: err.message,
    });
  }
};




/* Update Product Variant */
export const updateProductVariant = async (req: Request, res: Response) => {
  try {
    const { variantId } = req.params;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only admin can update product variants" });
    }

    const {
      SKU,
      Pack_Size,
      Unit,
      Price,
      Attributes,
      Tracking_Type,
      Brand_ID,
    } = req.body;

    const variant = await ProductVariant.findOne({
      _id: variantId,
      Business_ID: requester.Business_ID,
    });

    if (!variant) {
      return res.status(404).json({ message: "Product variant not found" });
    }

    // Optional brand validation
    if (Brand_ID) {
      const brand = await Brand.findOne({
        _id: Brand_ID,
        Business_ID: requester.Business_ID,
      });

      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }

      variant.Brand_ID = Brand_ID;
    }

    // SKU update + normalization
    if (SKU !== undefined) {
      variant.SKU = SKU;
      variant.SKU_Normalized = normalizeSKU(SKU);

    }

    if (Pack_Size !== undefined) variant.Pack_Size = Pack_Size;
    if (Unit !== undefined) variant.Unit = Unit;
    if (Price !== undefined) variant.Price = Price;
    if (Attributes !== undefined) variant.Attributes = Attributes;
    if (Tracking_Type !== undefined) variant.Tracking_Type = Tracking_Type;

    await variant.save();

    res.status(200).json({
      message: "Product variant updated successfully",
      Product_Variant_ID: variant._id,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Failed to update product variant",
      error: err.message,
    });
  }
};
 


