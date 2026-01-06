import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { api } from "../../../../api/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const CreateSupplierModal: React.FC<Props> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    Supplier_Name: "",
    Supplier_Email: "",
    Supplier_Address: "",
    Supplier_Phone: "",
  });

  const submit = async () => {
    await api.post("/suppliers", {
      ...form,
      Business_ID: localStorage.getItem("businessId"),
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
);
    onSuccess();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography fontWeight="bold" mb={2}>
          Add Supplier
        </Typography>

        {Object.entries(form).map(([k, v]) => (
          <TextField
            key={k}
            fullWidth
            label={k.replace("_", " ")}
            value={v}
            sx={{ mb: 2 }}
            onChange={(e) =>
              setForm({ ...form, [k]: e.target.value })
            }
          />
        ))}

        <Button fullWidth variant="contained" onClick={submit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateSupplierModal;
