import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SupplierToolbar from "./components/SupplierToolbar";
import SupplierTable from "./components/SupplierTable";
import CreateSupplierModal from "./components/CreateSupplierModal";
import type { Supplier } from "./types/supplier";
import { api } from "../../../api/api";

const SuppliersPage = () => {
  const [rows, setRows] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);

  const loadSuppliers = async () => {
    const res = await api.get("/suppliers");
    setRows(res.data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filtered = rows.filter((s) =>
    `${s.Supplier_Name} ${s.Supplier_Email} ${s.Supplier_Address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Suppliers
      </Typography>

      <SupplierToolbar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setOpenModal(true)}
      />

      <SupplierTable
        rows={filtered}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <CreateSupplierModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadSuppliers}
      />
    </Container>
  );
};

export default SuppliersPage;
