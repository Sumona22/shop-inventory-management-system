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
import type { Brand } from "../types/brandTypes";

interface Props {
  data: Brand[];
  loading: boolean;
  onEdit: (brand: Brand) => void;
}

const BrandTable = ({ data, loading, onEdit }: Props) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
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
                  <TableCell><Skeleton width={60} /></TableCell>
                </TableRow>
              ))}

            {!loading &&
              data.map((brand) => (
                <TableRow key={brand._id} hover>
                  <TableCell>{brand.Brand_Name}</TableCell>
                  <TableCell>
                    {brand.Brand_Description || "—"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onEdit(brand)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No brands found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BrandTable;
