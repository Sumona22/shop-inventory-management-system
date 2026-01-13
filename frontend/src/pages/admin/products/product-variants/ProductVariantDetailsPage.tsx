import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";

import { fetchProductVariantById } from "../../../../services/productVariantService";
import type { ProductVariant } from "./types/productVariantTypes";

const ProductVariantDetailsPage = () => {
  const { variantId } = useParams();
  const [variant, setVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (!variantId) return;
    fetchProductVariantById(variantId).then((res) =>
      setVariant(res.data)
    );
  }, [variantId]);

  if (!variant) return null;

  return (
    <Paper sx={{ p: 4, maxWidth: 720 }}>
      <Typography variant="h5" fontWeight={600}>
        Variant Details
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={1.2}>
        <Typography>
          <strong>Category:</strong>{" "}
          {variant.Product_ID.Category_ID?.Category_Name}
        </Typography>

        <Typography>
          <strong>Product:</strong>{" "}
          {variant.Product_ID.Product_Name}
        </Typography>

        <Typography>
          <strong>Brand:</strong>{" "}
          {variant.Brand_ID.Brand_Name}
        </Typography>

        <Typography>
          <strong>SKU:</strong> {variant.SKU}
        </Typography>

        <Typography>
          <strong>Pack:</strong>{" "}
          {variant.Pack_Size} {variant.Unit}
        </Typography>

        <Typography>
          <strong>Price:</strong> ₹{variant.Price}
        </Typography>
      </Stack>

      {/* Admin edit button (future use) */}
      <Button
        variant="contained"
        sx={{ mt: 3 }}
      >
        Edit Variant
      </Button>
    </Paper>
  );
};

export default ProductVariantDetailsPage;
