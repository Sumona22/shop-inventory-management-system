import { Typography } from "@mui/material";
import React from "react";
const OrderDetails: React.FC = () => {
    return (
        <>
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                mb={4}
                className="!text-blue-600"
            >
                View & Manage Order Details
            </Typography>
        </>
    );
}
export default OrderDetails;