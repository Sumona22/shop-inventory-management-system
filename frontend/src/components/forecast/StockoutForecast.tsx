import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material";
import { fetchStockoutForecast } from "../../services/forecastService";

export default function StockoutForecast() {
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleForecast = async () => {
    setLoading(true);
    setForecast(null);

    try {
      const res = await fetchStockoutForecast({
        ProductVariant_ID: "696747977b3b2c717ca272e4",
      });

      console.log("FORECAST RESPONSE 👉", res.data);

      if (res.data.success) {
        setForecast(res.data);
      }
    } catch (error) {
      console.error("Forecast error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stockout Forecast
        </Typography>

        <Button
          variant="contained"
          onClick={handleForecast}
          disabled={loading}
        >
          Calculate Forecast
        </Button>

        {loading && <LinearProgress sx={{ mt: 2 }} />}

        {forecast && (
          <Box mt={3}>
            <Typography>
              SKU: <b>{forecast.SKU}</b>
            </Typography>

            <Typography>
              Current Stock: <b>{forecast.Current_Stock}</b>
            </Typography>

            <Typography>
              Avg Daily Sales: <b>{forecast.Average_Daily_Sales}</b>
            </Typography>

            <Typography>
              Days Until Stockout:{" "}
              <b>
                {forecast.Days_Until_Stockout !== null
                  ? forecast.Days_Until_Stockout
                  : "∞"}
              </b>
            </Typography>

            <Box mt={1}>
              <Chip
                label={forecast.Forecast_Status}
                color={
                  forecast.Forecast_Status === "Critical"
                    ? "error"
                    : forecast.Forecast_Status === "Warning"
                    ? "warning"
                    : "success"
                }
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
