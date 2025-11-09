import React, { useState } from "react";
import { Box, Paper, Typography, Button} from "@mui/material";
import { api } from "../../api";
import BasePaper from "../../components/StyledPaper";

const StoreManagerDashboard: React.FC = () => {


    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(to right, #e8f5e9, #c8e6c9)", p: 4 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                Store Staff Dashboard
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
                <BasePaper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
                    <Typography fontWeight="bold" mb={2}>Update Stock Details</Typography>
                    <Button variant="contained" >Open</Button>
                </BasePaper>
                <BasePaper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
                    <Typography fontWeight="bold" mb={2}>Stock Alerts</Typography>
                    <Button variant="contained" >Open</Button>
                </BasePaper>
            </Box>

        </Box>
    );
}

export default StoreManagerDashboard