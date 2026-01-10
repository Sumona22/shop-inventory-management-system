import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BranchToolbar from "./components/BranchToolbar";
import BranchTable from "./components/BranchTable";
import CreateBranchModal from "./components/CreateBranchModal";
import type { Branch } from "./types/branch";
import { fetchBranches } from "../../../services/branchService";

interface BranchResponse {
  _id: string;
  Branch_Name: string;
  Branch_Address: string;
  StoreManager_User_ID: {
    Email: string;
  };
}

const BranchPage: React.FC = () => {
  const [rows, setRows] = useState<Branch[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);

 useEffect(() => {
  const loadBranches = async () => {
    try {
      const res = await fetchBranches();
      setRows(
        res.data.map((b: BranchResponse) => ({
          id: b._id,
          name: b.Branch_Name,
          address: b.Branch_Address,
          managerEmail: b.StoreManager_User_ID.Email,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch branches", err);
    }
  };

  loadBranches();
}, []);

  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} align="center">
        View / Manage Branch
      </Typography>

      <BranchToolbar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setOpenModal(true)}
      />

      <BranchTable
        rows={filtered}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <CreateBranchModal open={openModal} onClose={() => setOpenModal(false)} />
    </Container>
  );
};

export default BranchPage;
