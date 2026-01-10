import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Supplier } from "../types/supplier";

interface Props {
  rows: Supplier[];
  page: number;
  rowsPerPage: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (v: number) => void;
}

const SupplierTable: React.FC<Props> = ({
  rows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
    const navigate = useNavigate();
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              {["#", "Name", "Email", "Address", "Phone"].map((h) => (
                <TableCell key={h} sx={{ color: "primary.contrastText" }}>
                  <strong>{h}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row._id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/dashboard/admin/suppliers/${row._id}`)}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.Supplier_Name}</TableCell>
                  <TableCell>{row.Supplier_Email}</TableCell>
                  <TableCell>{row.Supplier_Address}</TableCell>
                  <TableCell>{row.Supplier_Phone || "—"}</TableCell>
                </TableRow>
              ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No suppliers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default SupplierTable;
