import { Box, Paper, Typography, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { fetchStaffByBranch } from "../../services/staffService";

/* Dummy sales data (kept for now) */
const salesData = [1200, 1800, 1500, 2200, 2000, 2600, 3000];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const StoreManagerOverview = () => {
  const [totalStaff, setTotalStaff] = useState<number>(0);

  useEffect(() => {
    const loadStaffCount = async () => {
      try {
        const res = await fetchStaffByBranch();
        setTotalStaff(res.data.length);
      } catch (err) {
        console.error("Failed to fetch staff count", err);
      }
    };

    loadStaffCount();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={3} textAlign="center">
        Store Overview
      </Typography>

      {/* ===== Centered Layout ===== */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
      >
        {/* ===== Sales Chart (CENTERED) ===== */}
        <Grid xs={12} md={8}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <Typography fontWeight="bold" mb={2} textAlign="center">
              Weekly Sales Trend (₹)
            </Typography>

            <Box display="flex" justifyContent="center">
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: days,
                  },
                ]}
                series={[
                  {
                    data: salesData,
                    label: "Sales",
                    curve: "monotoneX",   // smooth curve
                  },
                ]}
                height={300}
                grid={{ horizontal: true }}
                sx={{
                  ".MuiLineElement-root": {
                    strokeWidth: 3,
                  },
                  ".MuiMarkElement-root": {
                    display: "none", // remove dots for clean look
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* ===== Stats ===== */}
        <Grid xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <PeopleIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Staff
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalStaff}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <InventoryIcon color="warning" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Low Stock Items
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  —
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreManagerOverview;
