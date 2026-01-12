import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { ProductVariant } from "../types/productVariantTypes";

interface Props {
  data: ProductVariant[];
  loading: boolean;
}

const ProductVariantTable: React.FC<Props> = ({ data, loading }) => {
  const theme = useTheme();

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ mt: 3 }}>
      <TableContainer>
        <Table>

          {/* ================= TABLE HEADER ================= */}
          <TableHead>
            <TableRow
              sx={{
                bgcolor: theme.palette.primary.main,
              }}
            >
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                <strong>Product</strong>
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                <strong>Brand</strong>
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                <strong>Variant</strong>
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                <strong>Pack</strong>
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                <strong>Price</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ================= TABLE BODY ================= */}
          <TableBody>
            {data.map((v) => (
              <TableRow
                key={v._id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  {v.Product_ID?.Product_Name ?? "—"}
                </TableCell>

                <TableCell>
                  {v.Brand_ID?.Brand_Name ?? "—"}
                </TableCell>

                <TableCell>{v.SKU_Normalized}</TableCell>

                <TableCell>
                  {v.Pack_Size} {v.Unit}
                </TableCell>

                <TableCell sx={{ fontWeight: 600 }}>
                  ₹{v.Price}
                </TableCell>
              </TableRow>
            ))}

            {/* ================= EMPTY STATE ================= */}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No product variants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductVariantTable;
