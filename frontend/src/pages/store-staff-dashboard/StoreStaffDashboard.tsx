import React, { useState } from "react";
import { Box, Paper, Typography, Button} from "@mui/material";
import { api } from "../../api";

const StoreManagerDashboard: React.FC = () => {


    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(to right, #e8f5e9, #c8e6c9)", p: 4 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                Store Manager Dashboard
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
                <Paper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
                    <Typography fontWeight="bold" mb={2}>Update Stock Details</Typography>
                    <Button variant="contained" >Open</Button>
                </Paper>
                <Paper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
                    <Typography fontWeight="bold" mb={2}>Stock Alerts</Typography>
                    <Button variant="contained" >Open</Button>
                </Paper>
            </Box>

        </Box>
    );
}

export default StoreManagerDashboard