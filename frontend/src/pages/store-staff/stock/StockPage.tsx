import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StockSearchBar from "./components/StockSearchBar";
import BatchStockTable from "./components/BatchStockTable";
import ItemStockTable from "./components/ItemStockTable";
import UpdateStockModal from "./components/UpdateStockModal";
import { fetchBranchStock } from "../../../services/stockService";


const StockPage = () => {
  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBranchStock().then((res) => {
      setBatches(res.batches || []);
      setItems(res.items || []);
    });
  }, []);

  const filteredBatches = batches.filter((b) =>
    b.Batch_No.toLowerCase().includes(search.toLowerCase())
  );

  const filteredItems = items.filter((i) =>
    i.Item_No.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between">
        <StockSearchBar value={search} onChange={setSearch} />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Update Stock
        </Button>
      </Stack>

      <Typography variant="h6" mt={3}>
        Batch Stock
      </Typography>
      <BatchStockTable batches={filteredBatches} />

      <Typography variant="h6" mt={3}>
        Item Stock
      </Typography>
      <ItemStockTable items={filteredItems} />

      <UpdateStockModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default StockPage;
