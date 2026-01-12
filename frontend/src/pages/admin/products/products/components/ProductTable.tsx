import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Skeleton,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Product } from "../types/productTypes";

interface Props {
  data: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
}

const ProductTable = ({ data, loading, onEdit }: Props) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton width={60} /></TableCell>
                </TableRow>
              ))}

            {!loading &&
              data.map((prod) => (
                <TableRow key={prod._id} hover>
                  <TableCell>{prod.Product_Name}</TableCell>
                  <TableCell>{prod.Category_ID.Category_Name}</TableCell>
                  <TableCell>{prod.Product_Description || "—"}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onEdit(prod)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductTable;
