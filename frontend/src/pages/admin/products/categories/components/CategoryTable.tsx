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
import type { Category } from "../types/categoryTypes";

interface Props {
  data: Category[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (cat: Category) => void;
}

const CategoryTable = ({ data, loading, onView, onEdit }: Props) => {
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
              data.map((cat) => (
                <TableRow key={cat._id} hover>
                  <TableCell>{cat.Category_Name}</TableCell>
                  <TableCell>{cat.Category_Description || "—"}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onEdit(cat)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CategoryTable;
