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
import type { Branch } from "../types/branch";

interface Props {
  rows: Branch[];
  page: number;
  rowsPerPage: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (v: number) => void;
}

const BranchTable: React.FC<Props> = ({
  rows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Paper sx={{ mt: 3 }}>
      <TableContainer>
        <Table>
          {/* ================= TABLE HEADER ================= */}
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "primary.contrastText" }}>
                <strong>#</strong>
              </TableCell>
              <TableCell sx={{ color: "primary.contrastText" }}>
                <strong>Branch Name</strong>
              </TableCell>
              <TableCell sx={{ color: "primary.contrastText" }}>
                <strong>Address</strong>
              </TableCell>
              <TableCell sx={{ color: "primary.contrastText" }}>
                <strong>Manager Email</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ================= TABLE BODY ================= */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={`${row.name}-${index}`}>
                  {/* Serial Number */}
                  <TableCell>
                    {page * rowsPerPage + index + 1}
                  </TableCell>

                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.managerEmail}</TableCell>
                </TableRow>
              ))}

            {/* Empty state */}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No branches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================= PAGINATION ================= */}
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

export default BranchTable;
