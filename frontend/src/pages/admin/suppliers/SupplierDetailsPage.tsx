import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import type { Supplier } from "./types/supplier";

const SupplierDetailsPage = () => {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        const res = await api.get(`/suppliers/${supplierId}`);
        setSupplier(res.data);
      } catch (err) {
        console.error("Failed to load supplier", err);
      } finally {
        setLoading(false);
      }
    };

    loadSupplier();
  }, [supplierId]);

  const handleChange = (field: keyof Supplier, value: string) => {
    if (!supplier) return;
    setSupplier({ ...supplier, [field]: value });
  };

  const saveChanges = async () => {
    if (!supplier) return;
    try {
      setSaving(true);
      await api.put(`/suppliers/${supplier._id}`, supplier);
      alert("Supplier updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update supplier");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!supplier) {
    return (
      <Typography color="error" align="center" mt={6}>
        Supplier not found
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Supplier Details
      </Typography>

      {/* Identity (Read-only) */}
      <TextField
        fullWidth
        label="Supplier Name"
        value={supplier.Supplier_Name}
        disabled
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Supplier Email"
        value={supplier.Supplier_Email}
        disabled
        sx={{ mb: 3 }}
      />

      {/* Editable Fields */}
      <TextField
        fullWidth
        label="Phone"
        value={supplier.Supplier_Phone || ""}
        onChange={(e) =>
          handleChange("Supplier_Phone", e.target.value)
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Address"
        value={supplier.Supplier_Address}
        onChange={(e) =>
          handleChange("Supplier_Address", e.target.value)
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="GST Number"
        value={supplier.GST_Number || ""}
        onChange={(e) =>
          handleChange("GST_Number", e.target.value)
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Notes"
        value={supplier.Notes || ""}
        onChange={(e) =>
          handleChange("Notes", e.target.value)
        }
        multiline
        rows={3}
        sx={{ mb: 4 }}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={saving}
        onClick={saveChanges}
      >
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </Container>
  );
};

export default SupplierDetailsPage;
