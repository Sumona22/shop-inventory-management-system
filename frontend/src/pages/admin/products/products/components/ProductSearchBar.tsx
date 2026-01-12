import {
  TextField,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import type { Category } from "../../categories/types/categoryTypes";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  categoryId: string;
  onCategoryChange: (val: string) => void;
  categories: Category[];
}

const ProductSearchBar = ({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
}: Props) => {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {/* 🔍 Search (wider) */}
      <Box sx={{ width: 360 }}>
        <TextField
          fullWidth
          label="Search Product"
          placeholder="Name, category or description"
          size="small"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>

      {/* 🧩 Category Filter */}
      <Box sx={{ width: 220 }}>
        <TextField
          select
          fullWidth
          label="Filter by Category"
          size="small"
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.Category_Name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Stack>
  );
};

export default ProductSearchBar;
