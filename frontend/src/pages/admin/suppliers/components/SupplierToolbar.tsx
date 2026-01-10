import { Box, Button, TextField } from "@mui/material";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onAddClick: () => void;
}

const SupplierToolbar: React.FC<Props> = ({
  search,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        fullWidth
        label="Search supplier (name, email, location)"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Button variant="contained" onClick={onAddClick}>
        + Add Supplier
      </Button>
    </Box>
  );
};

export default SupplierToolbar;
