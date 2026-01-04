import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onAddClick: () => void;
}

const BranchToolbar: React.FC<Props> = ({
  search,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 3 }}
    >
      <Grid xs={8}>
        <TextField
          fullWidth
          label="Search Branch"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Grid>

      <Grid xs={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={onAddClick}>
          Add Branch
        </Button>
      </Grid>
    </Grid>
  );
};

export default BranchToolbar;
