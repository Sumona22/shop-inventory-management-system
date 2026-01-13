import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ProductVariantActionMenu from "./ProductVariantActionMenu";

interface Props {
  onAdd: () => void;
  onSearch: (value: string) => void;
}

const ProductVariantToolbar = ({ onAdd, onSearch }: Props) => {
  return (
    <Box
      sx={{
        mb: 3,
        px: 3,
        py: 2,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Product Variants
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Search Variants"
          onChange={(e) => onSearch(e.target.value)}
          sx={{ width: 260 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{ height: 40, fontWeight: 600 }}
        >
          Add Variant
        </Button>

        <ProductVariantActionMenu />
      </Box>
    </Box>
  );
};

export default ProductVariantToolbar;
