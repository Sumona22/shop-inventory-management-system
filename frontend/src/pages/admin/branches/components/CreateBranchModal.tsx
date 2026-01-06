import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createBranchWithManager } from "../../../../services/branchService";

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
  color: "text.primary",
  p: 4,
  borderRadius: 2,
};

const CreateBranchModal: React.FC<Props> = ({ open, onClose }) => {
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await createBranchWithManager({
      Business_ID: localStorage.getItem("businessId"),
      Branch_Name: branchName,
      Branch_Address: branchAddress,
      StoreManager_Email: email,
      StoreManager_Password: password,
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Create Branch & Manager
        </Typography>

        <TextField fullWidth label="Branch Name" sx={{ mb: 2 }} onChange={(e) => setBranchName(e.target.value)} />
        <TextField fullWidth label="Branch Address" sx={{ mb: 2 }} onChange={(e) => setBranchAddress(e.target.value)} />
        <TextField fullWidth label="Manager Email" sx={{ mb: 2 }} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Manager Password" type="password" sx={{ mb: 2 }} onChange={(e) => setPassword(e.target.value)} />

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateBranchModal;
