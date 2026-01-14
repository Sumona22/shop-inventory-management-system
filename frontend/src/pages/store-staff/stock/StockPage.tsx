import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StockSearchBar from "./components/StockSearchBar";
import BatchStockTable from "./components/BatchStockTable";
import ItemStockTable from "./components/ItemStockTable";
import UpdateStockModal from "./components/UpdateStockModal";
import { fetchBatchesByBranch } from "../../../services/batchService";

const StockPage = () => {
  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    const res = await fetchBatchesByBranch();
    setBatches(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBatches = batches.filter(
    (b) =>
      b.Batch_Code.toLowerCase().includes(search.toLowerCase()) ||
      b.Branch_Product_ID.Product_Variant_ID.SKU
        .toLowerCase()
        .includes(search.toLowerCase())
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
      <ItemStockTable items={items} />

      <UpdateStockModal
        open={open}
        onClose={() => {
          setOpen(false);
          loadData(); // 🔥 refresh after stock update
        }}
      />
    </Box>
  );
};

export default StockPage;
