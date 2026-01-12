import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const CategorySearchBar = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Search Category"
      placeholder="Name or description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
    />
  );
};

export default CategorySearchBar;
