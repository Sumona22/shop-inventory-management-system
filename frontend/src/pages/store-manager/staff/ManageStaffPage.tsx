import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StaffTable from "../../../components/sidebars/store-manager/staff/StaffTable";
import CreateStaffModal from "../../../components/modals/CreateStaffModal";
import { fetchStaffByBranch } from "../../../services/staffService";

interface StaffUser {
  _id: string;
  Email: string;
  Role: "StoreStaff" | "Cashier";
  createdAt: string;
}

const ManageStaffPage = () => {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const loadStaff = async () => {
    const res = await fetchStaffByBranch();
    setStaff(res.data);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <Box>
      {/* ================= Header ================= */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Staff & Cashiers
      </Typography>

      {/* ================= Action Bar ================= */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Staff / Cashier
        </Button>
      </Box>

      {/* ================= Table ================= */}
      <StaffTable rows={staff} />

      {/* ================= Modal ================= */}
      <CreateStaffModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadStaff}
      />
    </Box>
  );
};

export default ManageStaffPage;
