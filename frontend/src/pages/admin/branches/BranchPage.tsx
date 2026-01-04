import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BranchToolbar from "./components/BranchToolbar";
import BranchTable from "./components/BranchTable";
import CreateBranchModal from "./components/CreateBranchModal";
import type { Branch } from "./types/branch";

const BranchPage: React.FC = () => {
  const [rows, setRows] = useState<Branch[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setRows([
      { id: 1, name: "ABC Store Bansdroni", email: "abcb@gmail.com" },
      { id: 2, name: "ABC Store Salt Lake", email: "abcs@gmail.com" },
    ]);
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
