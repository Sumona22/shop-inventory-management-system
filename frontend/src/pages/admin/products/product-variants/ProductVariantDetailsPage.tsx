import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  Divider,
  Button,
  TextField,
  Box,
} from "@mui/material";

import {
  fetchProductVariantById,
  updateProductVariant,
} from "../../../../services/productVariantService";

import type { ProductVariant } from "./types/productVariantTypes";

const ProductVariantDetailsPage = () => {
  const { variantId } = useParams();

  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (!variantId) return;
    fetchProductVariantById(variantId).then((res) => {
      setVariant(res.data);
      setFormData(res.data); // clone for editing
    });
  }, [variantId]);

  if (!variant || !formData) return null;

  const handleSave = async () => {
    await updateProductVariant(variant._id, {
      SKU: formData.SKU,
      Pack_Size: formData.Pack_Size,
      Unit: formData.Unit,
      Price: formData.Price,
      Attributes: formData.Attributes,
      Tracking_Type: formData.Tracking_Type,
    });

    setVariant(formData);
    setEditMode(false);
  };

  const handleAttributeChange = (
    key: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      Attributes: {
        ...formData.Attributes,
        [key]: value,
      },
    });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h5" fontWeight={600}>
        Product Variant Details
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* BASIC DETAILS */}
      <Stack spacing={1.4}>
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

        {editMode ? (
          <TextField
            label="SKU"
            size="small"
            value={formData.SKU}
            onChange={(e) =>
              setFormData({ ...formData, SKU: e.target.value })
            }
          />
        ) : (
          <Typography>
            <strong>SKU:</strong> {variant.SKU}
          </Typography>
        )}

        {editMode ? (
          <TextField
            label="Pack Size"
            size="small"
            type="number"
            value={formData.Pack_Size}
            onChange={(e) =>
              setFormData({
                ...formData,
                Pack_Size: Number(e.target.value),
              })
            }
          />
        ) : (
          <Typography>
            <strong>Pack:</strong>{" "}
            {variant.Pack_Size} {variant.Unit}
          </Typography>
        )}

        {editMode ? (
          <TextField
            label="Price"
            size="small"
            type="number"
            value={formData.Price}
            onChange={(e) =>
              setFormData({
                ...formData,
                Price: Number(e.target.value),
              })
            }
          />
        ) : (
          <Typography>
            <strong>Price:</strong> ₹{variant.Price}
          </Typography>
        )}
      </Stack>

      {/* ATTRIBUTES */}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Attributes</Typography>

      {formData.Attributes &&
      Object.keys(formData.Attributes).length > 0 ? (
        <Stack spacing={1} mt={1}>
          {Object.entries(formData.Attributes).map(
            ([key, value]) => (
              <Box
                key={key}
                display="flex"
                gap={2}
                alignItems="center"
              >
                <Typography sx={{ width: 160 }}>
                  {key}
                </Typography>

                {editMode ? (
                  <TextField
                    size="small"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(
                        key,
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <Typography>{value}</Typography>
                )}
              </Box>
            )
          )}
        </Stack>
      ) : (
        <Typography color="text.secondary">
          No attributes available
        </Typography>
      )}

      {/* ACTION BUTTONS */}
      <Stack direction="row" spacing={2} mt={4}>
        {!editMode ? (
          <Button
            variant="contained"
            onClick={() => setEditMode(true)}
          >
            Edit Variant
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
            >
              Save Changes
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setFormData(variant);
                setEditMode(false);
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default ProductVariantDetailsPage;
