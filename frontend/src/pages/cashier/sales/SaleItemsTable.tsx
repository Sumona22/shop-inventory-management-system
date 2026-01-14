import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { SaleItemPayload } from "./AddSaleItemForm";

interface Props {
  items: SaleItemPayload[];
  onRemove: (index: number) => void;
}

const SaleItemsTable = ({ items, onRemove }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>SKU</TableCell>
          <TableCell align="right">Qty</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Tax %</TableCell>
          <TableCell align="right">Total</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {items.map((i, idx) => {
          const lineAmount = i.Quantity * i.Selling_Price;
          const taxAmount = (lineAmount * i.Tax_Percentage) / 100;

          return (
            <TableRow key={idx}>
              <TableCell>{i.ProductVariant_ID}</TableCell>
              <TableCell align="right">{i.Quantity}</TableCell>
              <TableCell align="right">{i.Selling_Price}</TableCell>
              <TableCell align="right">{i.Tax_Percentage}</TableCell>
              <TableCell align="right">
                {(lineAmount + taxAmount).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onRemove(idx)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SaleItemsTable;
