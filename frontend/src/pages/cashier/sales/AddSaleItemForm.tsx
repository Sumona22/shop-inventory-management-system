import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { fetchBranchProductsByBranch } from "../../../services/stockService";

export interface SaleItemPayload {
  ProductVariant_ID: string;
  Quantity: number;
  Selling_Price: number;
  Tax_Percentage: number;
}

interface Props {
  onAdd: (item: SaleItemPayload) => void;
}

const AddSaleItemForm = ({ onAdd }: Props) => {
  const [variants, setVariants] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [taxPercentage, setTaxPercentage] = useState<number>(0);

  /* Load enabled products for branch */
  useEffect(() => {
    fetchBranchProductsByBranch().then((res) => setVariants(res));
  }, []);

  /* ✅ AUTO-FILL PRICE & TAX */
  const handleVariantChange = (variant: any | null) => {
    setSelectedVariant(variant);

    if (variant) {
      setSellingPrice(variant.Product_Variant_ID.Price);
      setTaxPercentage(variant.Product_Variant_ID.Tax_Percentage || 0);
    } else {
      setSellingPrice(0);
      setTaxPercentage(0);
    }
  };

  const handleAdd = () => {
    if (!selectedVariant || quantity <= 0) {
      alert("Invalid item");
      return;
    }

    onAdd({
      ProductVariant_ID: selectedVariant.Product_Variant_ID._id,
      Quantity: quantity,
      Selling_Price: sellingPrice,
      Tax_Percentage: taxPercentage,
    });

    setSelectedVariant(null);
    setQuantity(1);
  };

  return (
    <Box mb={4}>
      <Stack spacing={2}>
        <Autocomplete
          options={variants}
          value={selectedVariant}
          onChange={(_, v) => handleVariantChange(v)}
          getOptionLabel={(o) =>
            o.Product_Variant_ID.SKU
          }
          renderInput={(params) => (
            <TextField {...params} label="Product" />
          )}
        />

        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />


        <TextField
          label="Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(Number(e.target.value))}
        />

        <TextField
          label="Tax %"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(Number(e.target.value))}
        />

        <Button variant="outlined" onClick={handleAdd}>
          Add Item
        </Button>
      </Stack>
    </Box>
  );
};

export default AddSaleItemForm;
