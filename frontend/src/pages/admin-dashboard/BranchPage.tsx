import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Alert,
  Modal,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../../api";

import { useNavigate } from "react-router-dom";

const BranchPage: React.FC = () => {
  const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId"); // stored after registration/login

  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [openAddBranchModal, setOpenAddBranchModal] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  // Fetch data from backend
  // const loadBranches = () => {
  //   getBranches()
  //     .then((res) => setRows(res.data))
  //     .catch(() =>
  //       setSnackbar({
  //         open: true,
  //         message: "Failed to fetch data!",
  //         severity: "error",
  //       })
  //     );
  // };

  // useEffect(() => {
  //   loadBranches();
  // }, []);

  useEffect(() => {
    const dummyBranches = [
      { id: 1, name: "ABC Store Bansdroni", email: "abcbansdroni@gmail.com" },
      { id: 2, name: "ABC Store Salt Lake Sector V", email: "abcsaltlake@gmail.com" },
      { id: 3, name: "ABC Store Howrah", email: "abchowrah@gmail.com" },
      { id: 4, name: "ABC Store New Town Plaza", email: "abcnewtown@gmail.com" },
      { id: 5, name: "ABC Store Sealdah", email: "abcsealdah@gmail.com" },
      { id: 6, name: "ABC Store Garia", email: "abcgaria@gmail.com" },
    ];

    setRows(dummyBranches);
  }, []);

  // Function to create branch + store manager
  const handleCreateBranchWithManager = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      await api.post("/users/branch-with-manager", {
        Business_ID: businessId,
        Branch_Name: branchName,
        Branch_Address: branchAddress,
        StoreManager_Email: managerEmail,
        StoreManager_Password: managerPassword,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      alert("Branch and Store Manager created successfully!");
      setOpenAddBranchModal(false);
      setBranchName("");
      setBranchAddress("");
      setManagerEmail("");
      setManagerPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to create branch + manager. Please check inputs.");
    }
  };

  const filteredRows = rows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete
  // const confirmDelete = () => {
  //   if (deleteId !== null) {
  //     deleteBranch(deleteId)
  //       .then(() => {
  //         setSnackbar({
  //           open: true,
  //           message: "Branch deleted successfully",
  //           severity: "success",
  //         });
  //         loadBranches();
  //       })
  //       .catch(() =>
  //         setSnackbar({
  //           open: true,
  //           message: "Delete failed!",
  //           severity: "error",
  //         })
  //       );
  //   }
  //   setDialogOpen(false);
  // };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      {/* Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", marginBottom: "30px" }}
      >
        View / Manage Branch
      </Typography>

      {/* Search + Add Button */}
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search Branch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={4} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={() => { setOpenAddBranchModal(true) }}
          >
            Add Branch
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <Paper sx={{
        width: "100%",
        overflow: "hidden",
        mx: "auto",
        maxWidth: "1200px",// keeps table centered and not full screen
        marginTop: 3
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#3ab8f2",
                }}>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}>
                  <strong>ID</strong>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}>
                  <strong>Branch Name</strong>
                </TableCell>
                <TableCell sx={{
                  color: "white",
                  fontWeight: "bold",
                }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell align="center"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{
                          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                          color: "white",
                          mx: 1,
                          "&:hover": {
                            background: "linear-gradient(135deg, #2563eb, #0891b2)",
                          },
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        sx={{
                          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                          color: "white",
                          mx: 1,
                          "&:hover": {
                            background: "linear-gradient(135deg, #2563eb, #0891b2)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        sx={{
                          background: "linear-gradient(135deg, #ef4444, #f97316)",
                          color: "white",
                          mx: 1,
                          "&:hover": {
                            background: "linear-gradient(135deg, #dc2626, #ea580c)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
        />
      </Paper>

      {/* Delete Dialog */}
      {/* <DeleteConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
      /> */}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity as any}>{snackbar.message}</Alert>
      </Snackbar>
      {/* Create Branch + Store Manager Modal */}
      <Modal
        open={openAddBranchModal}
        onClose={() => setOpenAddBranchModal(false)}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Create Branch & Store Manager
          </Typography>

          <TextField
            fullWidth
            label="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Branch Address"
            value={branchAddress}
            onChange={(e) => setBranchAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Manager Email"
            type="email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Manager Password"
            type="password"
            value={managerPassword}
            onChange={(e) => setManagerPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleCreateBranchWithManager}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

// Modal styling
const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default BranchPage;
