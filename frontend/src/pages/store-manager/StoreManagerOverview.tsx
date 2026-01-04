import { Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";

const overviewItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 2,
  mb: 1.5,
  borderRadius: 2,
  bgcolor: "background.paper",
};

const StoreManagerOverview = () => {
  return (
    <Box sx={{ mt: 4, maxWidth: 500 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Store Overview
      </Typography>

      <Box sx={overviewItemStyle}>
        <PeopleIcon color="primary" />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Staff
          </Typography>
          <Typography variant="h6">—</Typography>
        </Box>
      </Box>

      <Box sx={overviewItemStyle}>
        <AttachMoneyIcon color="success" />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Today’s Sales
          </Typography>
          <Typography variant="h6">—</Typography>
        </Box>
      </Box>

      <Box sx={overviewItemStyle}>
        <InventoryIcon color="warning" />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Low Stock Alerts
          </Typography>
          <Typography variant="h6">—</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreManagerOverview;
