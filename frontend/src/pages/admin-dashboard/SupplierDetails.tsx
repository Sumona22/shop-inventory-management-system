import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton, Tooltip } from "@mui/material";
import React from "react"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


interface Column {
  id: 'name' | 'email' | 'phone' | 'address' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
  { id: 'phone', label: 'Contact No.', minWidth: 100, align: 'center' },
  { id: 'address', label: 'Adress', minWidth: 100, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
];

interface Data {
  name: string;
  email: string;
  phone: number;
  address: string;
}

function createData(
  name: string,
  email: string,
  phone: number,
  address: string,
): Data {
  return { name, email, phone, address };
}

const rows = [
  createData("FreshFarm Foods", "contact@freshfarm.com", 9876543210, "12 Green Market Road, Kolkata"),
  createData("DailyHarvest Supplies", "support@dailyharvest.in", 9123456780, "45 Lake View Street, Siliguri"),
  createData("Amul Authorized Distributor", "info@amuldistrib.in", 9901122334, "Block D, Salt Lake Sector 3, Kolkata"),
  createData("Fortune Wholesale Traders", "sales@fortunefoods.in", 9122200345, "21 B T Road, Kolkata"),
  createData("Tata Consumer Depot", "service@tataconsumer.com", 9811229988, "New Market Area, Kolkata"),
  createData("Nestlé Essentials Supplier", "contact@nestlepartners.in", 9988771122, "Lake Road, Howrah"),
  createData("OrganicGlow Naturals", "organic@glownaturals.com", 9900553322, "Eco Park Road, New Town"),
  createData("PureBasket Hub", "order@purebasket.in", 9033445566, "77 Park Circus Main Road, Kolkata"),
  createData("SpiceWorld Traders", "sales@spiceworld.com", 9002244668, "Chandni Chowk Road, Kolkata"),
  createData("GoldenGrain Wholesale Agency", "support@goldengrain.in", 9122300456, "Malda Industrial Area"),
  createData("Metro Mart Distributors", "info@metromart.in", 9001122445, "Central Avenue, Howrah"),
  createData("GoodDay Essentials", "hello@gooddayessentials.in", 9812345678, "Raniganj Main Road"),
  createData("EverFresh Agencies", "sales@everfresh.com", 9811223344, "Khan Market Building, Burdwan"),
  createData("WholeCart Retailers", "whole@wholecart.in", 9033112299, "City Centre Lane, Kharagpur"),
  createData("NatureNest Foods", "nest@naturenest.com", 9900112233, "Paltan Bazar Street, Jalpaiguri"),
];

const SupplierDetails: React.FC = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        className="!text-blue-600"
      >
        View & Manage Supplier Details
      </Typography>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          mx: "auto",
          maxWidth: "1200px" // keeps table centered and not full screen
        }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{

                }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#3ab8f2",
                      minWidth: column.minWidth
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      {columns.map((column) => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key="actions" align="center">
                              <IconButton
                                sx={{
                                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                                  color: "white",
                                  mx: 1,
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #2563eb, #0891b2)",
                                  },
                                }}
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                sx={{
                                  background: "linear-gradient(135deg, #ef4444, #f97316)",
                                  color: "white",
                                  mx: 1,
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #dc2626, #ea580c)",
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
export default SupplierDetails;
