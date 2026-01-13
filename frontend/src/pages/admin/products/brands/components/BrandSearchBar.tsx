import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const BrandSearchBar = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Search Brand"
      placeholder="Name or description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
    />
  );
};

export default BrandSearchBar;
