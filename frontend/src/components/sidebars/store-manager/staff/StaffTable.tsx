import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface StaffUser {
  _id: string;
  Email: string;
  Role: string;
  createdAt: string;
}

const StaffTable = ({ rows }: { rows: StaffUser[] }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell><strong>Joined On</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Role}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StaffTable;
