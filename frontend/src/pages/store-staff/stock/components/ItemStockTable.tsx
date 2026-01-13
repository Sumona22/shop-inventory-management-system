import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import type { Item } from "../types/stockTypes";

interface Props {
  items: Item[];
}

const ItemStockTable = ({ items }: Props) => {
  return (
    <Paper sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Item No</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((i) => (
            <TableRow key={i._id}>
              <TableCell>
                {i.Branch_Product_ID.Product_Variant_ID.SKU}
              </TableCell>
              <TableCell>{i.Item_No}</TableCell>
              <TableCell>{i.Item_Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ItemStockTable;
