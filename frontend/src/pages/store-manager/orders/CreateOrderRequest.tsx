import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

import {
  fetchCategoriesService,
  fetchBrandsService,
  fetchProductsByCategoryService,
  fetchProductVariantsService,
} from "../../../services/productLookupService";
import { createOrderRequestService } from "../../../services/orderRequestService";

const emptyItem = {
  Category_ID: "",
  Brand_ID: "",
  Product_ID: "",
  Product_Variant_ID: "",
  Requested_Quantity: 1,
};

export default function CreateOrderRequest() {
  const [items, setItems] = useState<any[]>([{ ...emptyItem }]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [productsMap, setProductsMap] = useState<Record<number, any[]>>({});
  const [variantsMap, setVariantsMap] = useState<Record<number, any[]>>({});
  const [message, setMessage] = useState("");

  /* =========================
     Initial Load
  ========================= */
  useEffect(() => {
    fetchCategoriesService().then(res => setCategories(res.data));
    fetchBrandsService().then(res => setBrands(res.data));
  }, []);

  /* =========================
     Helpers
  ========================= */
  const updateItem = (index: number, key: string, value: any) => {
    setItems(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const addItem = () => {
    setItems(prev => [...prev, { ...emptyItem }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  /* =========================
     Submit
  ========================= */
  const submitOrder = async () => {
    await createOrderRequestService({
      Expected_Receive_Date: new Date(),
      Items: items.map(i => ({
        Product_Variant_ID: i.Product_Variant_ID,
        Requested_Quantity: i.Requested_Quantity,
      })),
      Message: message,
    });

    alert("Order request created successfully");
  };

  return (
  <Box className="min-h-screen bg-slate-100 py-6">
    <Box className="max-w-6xl mx-auto px-4">
      <Typography variant="h5" className="mb-6 font-semibold">
        Create Order Request
      </Typography>

      {items.map((item, index) => (
        <Card key={index} className="mb-4 hover:shadow-md">
          <CardContent className="relative">
            {items.length > 1 && (
              <IconButton
                onClick={() => removeItem(index)}
                className="!absolute top-2 right-2 hover:text-red-600"
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}

            <Grid container spacing={2}>
              {/* CATEGORY */}
              <Grid item xs={12} md={2}>
                <Select
                  fullWidth
                  value={item.Category_ID}
                  displayEmpty
                  onChange={async e => {
                    const categoryId = e.target.value;

                    updateItem(index, "Category_ID", categoryId);
                    updateItem(index, "Product_ID", "");
                    updateItem(index, "Product_Variant_ID", "");

                    setVariantsMap(prev => ({ ...prev, [index]: [] }));

                    const res =
                      await fetchProductsByCategoryService(categoryId);
                    setProductsMap(prev => ({
                      ...prev,
                      [index]: res.data,
                    }));
                  }}
                >
                  <MenuItem value="">Category</MenuItem>
                  {categories.map(c => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.Category_Name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* BRAND */}
              <Grid item xs={12} md={2}>
                <Select
                  fullWidth
                  value={item.Brand_ID}
                  displayEmpty
                  onChange={async e => {
                    const brandId = e.target.value;

                    updateItem(index, "Brand_ID", brandId);
                    updateItem(index, "Product_Variant_ID", "");

                    const productId = items[index].Product_ID;

                    if (!brandId || !productId) {
                      setVariantsMap(prev => ({ ...prev, [index]: [] }));
                      return;
                    }

                    const res =
                      await fetchProductVariantsService(productId, brandId);

                    setVariantsMap(prev => ({
                      ...prev,
                      [index]: res.data,
                    }));
                  }}
                >
                  <MenuItem value="">Brand</MenuItem>
                  {brands.map(b => (
                    <MenuItem key={b._id} value={b._id}>
                      {b.Brand_Name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* PRODUCT */}
              <Grid item xs={12} md={3}>
                <Select
                  fullWidth
                  value={item.Product_ID}
                  displayEmpty
                  onChange={async e => {
                    const productId = e.target.value;

                    updateItem(index, "Product_ID", productId);
                    updateItem(index, "Product_Variant_ID", "");

                    const brandId = items[index].Brand_ID;

                    if (!brandId || !productId) {
                      setVariantsMap(prev => ({ ...prev, [index]: [] }));
                      return;
                    }

                    const res =
                      await fetchProductVariantsService(productId, brandId);

                    setVariantsMap(prev => ({
                      ...prev,
                      [index]: res.data,
                    }));
                  }}
                >
                  <MenuItem value="">Product</MenuItem>
                  {(productsMap[index] || []).map(p => (
                    <MenuItem key={p._id} value={p._id}>
                      {p.Product_Name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* VARIANT */}
              <Grid item xs={12} md={3}>
                <Select
                  fullWidth
                  value={item.Product_Variant_ID}
                  displayEmpty
                  onChange={e =>
                    updateItem(index, "Product_Variant_ID", e.target.value)
                  }
                >
                  <MenuItem value="">Variant</MenuItem>
                  {(variantsMap[index] || []).map(v => (
                    <MenuItem key={v._id} value={v._id}>
                      {v.SKU} | {v.Pack_Size} {v.Unit}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* QTY */}
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Qty"
                  inputProps={{ min: 1 }}
                  value={item.Requested_Quantity}
                  onChange={e =>
                    updateItem(
                      index,
                      "Requested_Quantity",
                      Number(e.target.value)
                    )
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* MESSAGE */}
      <Card className="mt-6">
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Message for warehouse / supplier (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <Box className="mt-6 flex flex-col items-center gap-4">
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={addItem}
        >
          Add Product
        </Button>

        <Button
          startIcon={<SendIcon />}
          variant="contained"
          size="large"
          onClick={submitOrder}
        >
          Submit Order
        </Button>
      </Box>
    </Box>
  </Box>
);
}
