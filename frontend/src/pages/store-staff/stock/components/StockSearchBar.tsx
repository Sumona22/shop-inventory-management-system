import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const StockSearchBar = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Search by SKU / Item / Batch"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 300 }}
    />
  );
};

export default StockSearchBar;
