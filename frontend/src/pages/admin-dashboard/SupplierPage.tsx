import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const SupplierPage: React.FC = () => {

    const navigate = useNavigate();
    const functions = [
        { name: "View & Manage Supplier Details", path: "/supplier-details" },
        { name: "View & Manage Order Details", path: "/order-details" },
    ];

    return (
        <>
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                mb={4}
                className="!text-blue-600"
            >
                Place Order to the Suppliers
            </Typography>
            <Box className="flex gap-10"
                sx={{
                    justifyContent: "center",
                }}
            >
                {functions.map((func, idx) => (
                    <Paper
                        key={idx}
                        elevation={4}
                        sx={{
                            width: 260,
                            p: 3,
                            textAlign: "center",
                            borderRadius: 3,
                            transition: 0.3,
                            "&:hover": {
                                transform: "scale(1.05)",
                                backgroundColor: "#e8f5e9",
                            }

                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            textAlign="center"
                            color="textPrimary"
                            mb={2}
                        >
                            {func.name}
                        </Typography>
                        <Button
                            variant="contained"
                            className="!bg-green-600"
                            onClick={() => {
                                navigate(func.path);
                            }}
                        >
                            Open
                        </Button>
                    </Paper>
                ))
                }
            </Box>
        </>

    );
}
export default SupplierPage;