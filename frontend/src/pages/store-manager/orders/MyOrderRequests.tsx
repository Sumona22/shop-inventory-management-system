import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { fetchMyOrderRequestsService } from "../../../services/orderRequestService";

/* ---------- STATUS CONFIG ---------- */
const STATUS_CONFIG: Record<string, {
  label: string;
  color: "default" | "info" | "warning" | "success" | "error";
}> = {
  CREATED: {
  label: "Submitted",
  color: "default"
},
UNDER_ADMIN_REVIEW: {
  label: "Under Admin Review",
  color: "warning"
},
MODIFIED_BY_ADMIN: {
  label: "Modified by Admin",
  color: "info"
},
WAITING_FOR_AVAILABILITY: {
  label: "Waiting for Stock",
  color: "default"
},
APPROVED: {
  label: "Approved",
  color: "success"
},
REJECTED: {
  label: "Rejected",
  color: "error"
}

};

export default function MyOrderRequests() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrderRequestsService().then(res =>
      setOrders(res.data.data)
    );
  }, []);

  /* ---------- SUMMARY (REAL DATA) ---------- */
  const summary = useMemo(() => {
    const count = (status: string) =>
      orders.filter(o => o.Status === status).length;

    const pendingCount = orders.filter(
  o =>
    o.Status === "CREATED" ||
    o.Status === "UNDER_ADMIN_REVIEW"
).length;

    return {
      total: orders.length,
      pending: pendingCount,
      modified: count("MODIFIED_BY_ADMIN"),
      approved: count("APPROVED"),
      rejected: count("REJECTED"),
      waiting: count("WAITING_FOR_AVAILABILITY"),
    };
  }, [orders]);

  /* ---------- FILTER ---------- */
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch =
        o.Order_Request_Number
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || o.Status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <Box className="min-h-screen bg-slate-100 py-6">
      <Box className="max-w-6xl mx-auto px-4 space-y-6">

        {/* TITLE */}
        <Typography variant="h5" fontWeight={600}>
          My Order Requests
        </Typography>

        {/* SUMMARY */}
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <SummaryCard title="Total" value={summary.total} />
          <SummaryCard title="Pending" value={summary.pending} color="warning" />
          <SummaryCard title="Modified" value={summary.modified} color="info" />
          <SummaryCard title="Approved" value={summary.approved} color="success" />
          <SummaryCard title="Rejected" value={summary.rejected} color="error" />
          <SummaryCard title="Waiting" value={summary.waiting} />
        </Box>

        {/* SEARCH & FILTER */}
        <Card>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Search by Order #"
              value={search}
              onChange={e => setSearch(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <MenuItem value="ALL">All</MenuItem>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <MenuItem key={key} value={key}>
                    {cfg.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* ORDER LIST */}
        {filteredOrders.map(order => {
          const cfg = STATUS_CONFIG[order.Status] || {
            label: order.Status,
            color: "default",
          };

          return (
            <Card
              key={order._id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                navigate(
                  `/dashboard/store-manager/order-requests/${order._id}`
                )
              }
            >
              <CardContent className="space-y-2">
                <Box className="flex items-center justify-between">
                  <Typography fontWeight={600}>
                    Order #{order.Order_Request_Number}
                  </Typography>

                  <Chip
                    label={cfg.label}
                    color={cfg.color}
                    size="small"
                  />
                </Box>

                <Divider />

                <Typography variant="body2" color="text.secondary">
                  Created on: {new Date(order.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          );
        })}

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent>
              <Typography align="center" color="text.secondary">
                No order requests found
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}

/* ---------- SUMMARY CARD ---------- */
function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color?: "success" | "warning" | "error" | "info";
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          color={color ? `${color}.main` : "text.primary"}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
