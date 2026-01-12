import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
} from "@mui/material";
import { fetchAllOrderRequestsService } from "../../../services/orderRequestService";

export default function AdminOrderRequests() {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrderRequestsService().then(res =>
      setOrders(res.data.data)
    );
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
  <Box className="min-h-screen bg-slate-100 py-6">
    <Box className="max-w-7xl mx-auto px-6">
      <Typography
        variant="h5"
        fontWeight={600}
        className="mb-6"
      >
        All Order Requests
      </Typography>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table stickyHeader>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">
                  Order #
                </TableCell>
                <TableCell className="font-semibold">
                  Branch Address
                </TableCell>
                <TableCell className="font-semibold">
                  Date
                </TableCell>
                <TableCell className="font-semibold">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map(order => (
                <TableRow
                  key={order._id}
                  hover
                  className="cursor-pointer transition-colors"
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/order-requests/${order._id}`
                    )
                  }
                >
                  <TableCell>
                    {order.Order_Request_Number}
                  </TableCell>

                  <TableCell>
                    {order.Branch_ID?.Branch_Address || "—"}
                  </TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.Status}
                      color={getStatusColor(order.Status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    className="py-8 text-gray-500"
                  >
                    No order requests found
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
}
