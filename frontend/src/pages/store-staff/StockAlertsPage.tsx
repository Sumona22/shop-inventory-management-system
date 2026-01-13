import { Typography } from "@mui/material";

const StockAlertsPage = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Stock Alerts
      </Typography>
      <Typography color="text.secondary">
        Low stock and expiry alerts will appear here.
      </Typography>
    </>
  );
};

export default StockAlertsPage;
