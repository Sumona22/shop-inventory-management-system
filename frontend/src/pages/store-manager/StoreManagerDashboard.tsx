import { Box, Typography } from "@mui/material";
import { useState } from "react";
import StoreManagerSidebar from "../../components/sidebars/store-manager/StoreManagerSidebar";
import StoreManagerOverview from "./StoreManagerOverview";
import CreateStaffModal from "../../components/modals/CreateStaffModal";

const StoreManagerDashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <StoreManagerSidebar onAddStaff={() => setOpenModal(true)} />

      <Box sx={{ flex: 1, p: 4, bgcolor: "background.default" }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome, Store Manager 👋
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Manage staff, track sales performance, monitor inventory alerts,
          and communicate efficiently — all from one centralized dashboard.
        </Typography>

        <StoreManagerOverview />
      </Box>

      <CreateStaffModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default StoreManagerDashboard;
