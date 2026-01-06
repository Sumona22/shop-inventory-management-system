import { Box, Typography } from "@mui/material";
import StoreManagerOverview from "./StoreManagerOverview";

const StoreManagerDashboard = () => {
  return (

      <Box
        sx={{
          flex: 1,
          bgcolor: "background.default",
          p: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome, Store Manager 👋
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Manage staff, track sales performance, monitor inventory alerts,
          and communicate efficiently from one place.
        </Typography>

        <StoreManagerOverview />
      </Box>
  );
};

export default StoreManagerDashboard;
