import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import { fetchOrderRequestByIdService } from "../../../services/orderRequestService";

interface OrderItem {
  Product_Variant_ID: {
    _id: string;
    SKU: string;
    Pack_Size: number;
    Unit: string;
    Product_ID?: {
      Product_Name: string;
    };
    Brand_ID?: {
      Brand_Name: string;
    };
  };
  Requested_Quantity: number;
  Admin_Modified_Quantity?: number;
}

/* ---------- STATUS CONFIG ---------- */
const STATUS_CONFIG: Record<
  string,
  { label: string; color: "default" | "info" | "warning" | "success" | "error" }
> = {
  PENDING: { label: "Pending Admin Review", color: "warning" },
  MODIFIED_BY_ADMIN: { label: "Modified by Admin", color: "info" },
  APPROVED: { label: "Approved", color: "success" },
  REJECTED: { label: "Rejected", color: "error" },
  WAITING_FOR_AVAILABILITY: { label: "Waiting for Stock", color: "default" },
};

const OrderRequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetchOrderRequestByIdService(id!);
        setOrder(res.data.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <Box className="p-6 text-center text-gray-500">
        Loading order details...
      </Box>
    );

  if (!order)
    return (
      <Box className="p-6 text-center text-red-500">
        Order not found
      </Box>
    );

  const statusCfg =
    STATUS_CONFIG[order.Status] || {
      label: order.Status,
      color: "default",
    };

  return (
    <Box className="min-h-screen bg-slate-100 py-6">
      <Box className="max-w-6xl mx-auto px-4 space-y-6">

        {/* HEADER */}
        <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <Typography variant="h5" fontWeight={600}>
            Order Request Details
          </Typography>

          <Chip
            label={statusCfg.label}
            color={statusCfg.color}
            size="medium"
          />
        </Box>

        {/* ORDER INFO */}
        <Card>
          <CardContent className="space-y-2">
            <Typography>
              <strong>Order Number:</strong> #{order.Order_Request_Number}
            </Typography>

            <Typography>
              <strong>Expected Receive Date:</strong>{" "}
              {new Date(order.Expected_Receive_Date).toLocaleDateString()}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Created on: {new Date(order.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        {/* ADMIN MESSAGE */}
        {order.Admin_Response_Message && (
          <Alert severity="info">
            <strong>Admin Message:</strong> {order.Admin_Response_Message}
          </Alert>
        )}

        {/* ITEMS TABLE */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} className="mb-3">
              Order Items
            </Typography>

            <Divider className="mb-4" />

            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>Brand</strong></TableCell>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Pack</strong></TableCell>
                  <TableCell align="right">
                    <strong>Requested Qty</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Approved Qty</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.Items.map((item: OrderItem, index: number) => {
                  const variant = item.Product_Variant_ID;

                  if (!variant) {
                    return (
                      <TableRow key={index}>
                        <TableCell colSpan={6}>
                          <Typography color="error">
                            Variant data missing
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return (
                    <TableRow key={index} hover>
                      <TableCell>
                        {variant.Product_ID?.Product_Name || "—"}
                      </TableCell>
                      <TableCell>
                        {variant.Brand_ID?.Brand_Name || "—"}
                      </TableCell>
                      <TableCell>{variant.SKU || "—"}</TableCell>
                      <TableCell>
                        {variant.Pack_Size} {variant.Unit}
                      </TableCell>
                      <TableCell align="right">
                        {item.Requested_Quantity}
                      </TableCell>
                      <TableCell align="right">
                        {item.Admin_Modified_Quantity ??
                          item.Requested_Quantity}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {order.Items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="text.secondary">
                        No items found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </Box>
    </Box>
  );
};

export default OrderRequestDetails;
