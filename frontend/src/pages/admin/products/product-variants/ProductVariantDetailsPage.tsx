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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  fetchProductVariantById,
  updateProductVariant,
} from "../../../../services/productVariantService";

import type { ProductVariant } from "./types/productVariantTypes";

const ProductVariantDetailsPage = () => {
  const { variantId } = useParams();

  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [sku, setSku] = useState("");
  const [packSize, setPackSize] = useState<number>(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState<number>(0);

  const [attributes, setAttributes] = useState<Record<string, string>>({});

  const [newAttrKey, setNewAttrKey] = useState("");
  const [newAttrValue, setNewAttrValue] = useState("");

  useEffect(() => {
    if (!variantId) return;

    fetchProductVariantById(variantId).then((res) => {
      const data = res.data;
      setVariant(data);
      setSku(data.SKU);
      setPackSize(data.Pack_Size);
      setUnit(data.Unit);
      setPrice(data.Price);
      setAttributes(data.Attributes || {});
    });
  }, [variantId]);

  if (!variant) return null;

  /* ---------- Attribute handlers ---------- */

  const handleAttributeChange = (key: string, value: string) => {
    setAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleRemoveAttribute = (key: string) => {
    const updated = { ...attributes };
    delete updated[key];
    setAttributes(updated);
  };

  const handleAddAttribute = () => {
    if (!newAttrKey.trim()) return;

    setAttributes((prev) => ({
      ...prev,
      [newAttrKey]: newAttrValue,
    }));

    setNewAttrKey("");
    setNewAttrValue("");
  };

  /* ---------- Save / Cancel ---------- */

  const handleSave = async () => {
    await updateProductVariant(variant._id, {
      SKU: sku,
      Pack_Size: packSize,
      Unit: unit,
      Price: price,
      Attributes: attributes,
    });

    setVariant({
      ...variant,
      SKU: sku,
      Pack_Size: packSize,
      Unit: unit,
      Price: price,
      Attributes: attributes,
    });

    setEditMode(false);
  };

  const handleCancel = () => {
    setSku(variant.SKU);
    setPackSize(variant.Pack_Size);
    setUnit(variant.Unit);
    setPrice(variant.Price);
    setAttributes(variant.Attributes || {});
    setEditMode(false);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h5" fontWeight={600}>
        Product Variant Details
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* BASIC INFO */}
      <Stack spacing={1.4}>
        <Typography>
          <strong>Category:</strong>{" "}
          {variant.Product_ID.Category_ID?.Category_Name}
        </Typography>

        <Typography>
          <strong>Product:</strong> {variant.Product_ID.Product_Name}
        </Typography>

        <Typography>
          <strong>Brand:</strong> {variant.Brand_ID.Brand_Name}
        </Typography>

        {/* SKU */}
        {editMode ? (
          <TextField
            label="SKU"
            size="small"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        ) : (
          <Typography>
            <strong>SKU:</strong> {variant.SKU}
          </Typography>
        )}

        {/* PACK SIZE */}
        {editMode ? (
          <TextField
            label="Pack Size"
            size="small"
            type="number"
            value={packSize}
            onChange={(e) => setPackSize(Number(e.target.value))}
          />
        ) : (
          <Typography>
            <strong>Pack Size:</strong> {variant.Pack_Size}
          </Typography>
        )}

        {/* UNIT */}
        {editMode ? (
          <TextField
            label="Unit"
            size="small"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        ) : (
          <Typography>
            <strong>Unit:</strong> {variant.Unit}
          </Typography>
        )}

        <Typography>
          <strong>Tracking Type:</strong> {variant.Tracking_Type}
        </Typography>

        {/* PRICE */}
        {editMode ? (
          <TextField
            label="Price"
            size="small"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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

      {Object.keys(attributes).length > 0 ? (
        <Stack spacing={1} mt={1}>
          {Object.entries(attributes).map(([key, value]) => (
            <Box
              key={key}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Typography sx={{ width: 160 }}>{key}</Typography>

              {editMode ? (
                <>
                  <TextField
                    size="small"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(key, e.target.value)
                    }
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveAttribute(key)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <Typography>{value}</Typography>
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">
          No attributes available
        </Typography>
      )}

      {/* ADD NEW ATTRIBUTE */}
      {editMode && (
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            label="Attribute Name"
            size="small"
            value={newAttrKey}
            onChange={(e) => setNewAttrKey(e.target.value)}
          />
          <TextField
            label="Attribute Value"
            size="small"
            value={newAttrValue}
            onChange={(e) => setNewAttrValue(e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddAttribute}>
            Add
          </Button>
        </Stack>
      )}

      {/* ACTION BUTTONS */}
      <Stack direction="row" spacing={2} mt={4}>
        {!editMode ? (
          <Button variant="contained" onClick={() => setEditMode(true)}>
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

            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default ProductVariantDetailsPage;
