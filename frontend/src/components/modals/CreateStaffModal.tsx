import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createStaffOrCashier } from "../../services/staffService";

interface Props {
  open: boolean;
  onClose: () => void;
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

const CreateStaffModal: React.FC<Props> = ({ open, onClose }) => {
  const [role, setRole] = useState("StoreStaff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await createStaffOrCashier({
      Role: role,
      Email: email,
      Password: password,
      Business_ID: localStorage.getItem("businessId"),
      Branch_ID: localStorage.getItem("branchId"),
    });

    onClose();
    setEmail("");
    setPassword("");
    setRole("StoreStaff");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Create Staff or Cashier
        </Typography>

        <TextField
          select
          fullWidth
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="StoreStaff">Store Staff</MenuItem>
          <MenuItem value="Cashier">Cashier</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Email"
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateStaffModal;
