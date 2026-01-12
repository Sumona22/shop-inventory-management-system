import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

import {
  fetchOrderRequestByIdService,
  modifyOrderRequestService,
  approveOrderRequestService,
  rejectOrderRequestService,
  markWaitingForAvailabilityService,
} from "../../../services/orderRequestService";

type ActionType = "" | "MODIFY" | "WAIT" | "APPROVE" | "REJECT";

export default function AdminOrderRequestDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [action, setAction] = useState<ActionType>("");
  const [message, setMessage] = useState("");

  /* -------- FETCH ORDER BY ID -------- */
  useEffect(() => {
    if (!orderId) return;

    fetchOrderRequestByIdService(orderId)
      .then(res => {
        setOrder(res.data.data);
        setItems(res.data.data.Items || []);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load order details");
      });
  }, [orderId]);

  if (!order) return <p className="p-6">Loading...</p>;

  /* -------- SUBMIT ACTION -------- */
  const handleSubmit = async () => {
    try {
      if (action === "MODIFY") {
        await modifyOrderRequestService(order._id, {
          Items: items.map(i => ({
            Product_Variant_ID: i.Product_Variant_ID?._id,
            Admin_Modified_Quantity:
              i.Admin_Modified_Quantity ?? i.Requested_Quantity,
          })),
          Admin_Response_Message: message,
        });
      }

      if (action === "WAIT") {
        await markWaitingForAvailabilityService(order._id, message);
      }

      if (action === "APPROVE") {
        await approveOrderRequestService(order._id);
      }

      if (action === "REJECT") {
        await rejectOrderRequestService(order._id, message);
      }

      alert("Action completed");
      navigate("/dashboard/admin/order-requests");
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  /* -------- UI -------- */
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Typography variant="h5" fontWeight={600}>
                Order #{order.Order_Request_Number}
              </Typography>

              <Chip
                label={order.Status}
                color={
                  order.Status === "APPROVED"
                    ? "success"
                    : order.Status === "REJECTED"
                    ? "error"
                    : order.Status === "WAITING"
                    ? "warning"
                    : "default"
                }
              />
            </div>

            {/* META INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Paper className="p-4 rounded-xl">
                <Typography variant="caption" color="text.secondary">
                  Branch
                </Typography>
                <Typography fontWeight={500}>
                  {order.Branch_ID?.Branch_Name}
                </Typography>
              </Paper>

              <Paper className="p-4 rounded-xl">
                <Typography variant="caption" color="text.secondary">
                  Address
                </Typography>
                <Typography fontWeight={500}>
                  {order.Branch_ID?.Branch_Address}
                </Typography>
              </Paper>
            </div>

            {/* ITEMS TABLE */}
            <div>
              <Typography variant="h6" fontWeight={600} className="mb-3">
                Order Items
              </Typography>

              <TableContainer component={Paper} className="rounded-xl">
                <Table>
                  <TableHead>
                    <TableRow className="bg-slate-50">
                      <TableCell>Product</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Variant</TableCell>
                      <TableCell>Requested</TableCell>
                      {action === "MODIFY" && (
                        <TableCell>Admin Qty</TableCell>
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {items.map((item, i) => (
                      <TableRow key={i} hover>
                        <TableCell>
                          {item.Product_Variant_ID?.Product_ID?.Product_Name}
                        </TableCell>
                        <TableCell>
                          {item.Product_Variant_ID?.Brand_ID?.Brand_Name}
                        </TableCell>
                        <TableCell>
                          {
                            item.Product_Variant_ID?.Product_ID
                              ?.Category_ID?.Category_Name
                          }
                        </TableCell>
                        <TableCell>
                          {item.Product_Variant_ID?.Pack_Size}{" "}
                          {item.Product_Variant_ID?.Unit}
                        </TableCell>
                        <TableCell>
                          {item.Requested_Quantity}
                        </TableCell>

                        {action === "MODIFY" && (
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              inputProps={{ min: 1 }}
                              value={
                                item.Admin_Modified_Quantity ??
                                item.Requested_Quantity
                              }
                              onChange={e => {
                                const copy = [...items];
                                copy[i].Admin_Modified_Quantity = Number(
                                  e.target.value
                                );
                                setItems(copy);
                              }}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* ADMIN ACTION */}
            <div>
              <Typography variant="h6" fontWeight={600} className="mb-3">
                Admin Action
              </Typography>

              <Paper className="p-4 rounded-xl space-y-4">
                <FormControl fullWidth>
                  <InputLabel>Select Action</InputLabel>
                  <Select
                    label="Select Action"
                    value={action}
                    onChange={e =>
                      setAction(e.target.value as ActionType)
                    }
                  >
                    <MenuItem value="MODIFY">Modify Quantity</MenuItem>
                    <MenuItem value="WAIT">Stock Not Available</MenuItem>
                    <MenuItem value="APPROVE">Approve</MenuItem>
                    <MenuItem value="REJECT">Reject</MenuItem>
                  </Select>
                </FormControl>

                {(action === "MODIFY" ||
                  action === "WAIT" ||
                  action === "REJECT") && (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Admin response message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                )}

                {action && (
                  <div className="flex justify-end">
                    <Button
                      variant="contained"
                      size="large"
                      color={
                        action === "APPROVE"
                          ? "success"
                          : action === "REJECT"
                          ? "error"
                          : action === "WAIT"
                          ? "warning"
                          : "primary"
                      }
                      onClick={handleSubmit}
                    >
                      Submit Action
                    </Button>
                  </div>
                )}
              </Paper>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
