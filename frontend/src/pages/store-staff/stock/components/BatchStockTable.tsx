import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import type { Batch } from "../types/stockTypes";

interface Props {
  batches: Batch[];
}

const BatchStockTable = ({ batches }: Props) => {
  return (
    <Paper sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Batch No</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {batches.map((b) => (
            <TableRow key={b._id}>
              <TableCell>
                {b.Branch_Product_ID.Product_Variant_ID.SKU}
              </TableCell>
              <TableCell>{b.Batch_No}</TableCell>
              <TableCell>{b.Quantity}</TableCell>
              <TableCell>
                {b.Expiry_Date
                  ? new Date(b.Expiry_Date).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>{b.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BatchStockTable;
