import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductVariantActionMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          height: 40,           
          width: 40,
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate("/dashboard/admin/categories")}>
          <ListItemIcon>
            <CategoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Categories</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => navigate("/dashboard/admin/brands")}>
          <ListItemIcon>
            <BrandingWatermarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Brands</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => navigate("/dashboard/admin/products")}>
          <ListItemIcon>
            <InventoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Products</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProductVariantActionMenu;
