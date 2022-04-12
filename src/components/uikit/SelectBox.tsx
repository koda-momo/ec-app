import { FC, memo } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

type Props = {
  required: boolean;
  value: string;
  label: string;
  select: (e: any) => void;
  options: Array<{ id: string; name: string }>;
};

export const SelectBox: FC<Props> = memo((props) => {
  const { required, label, value, select, options } = props;

  return (
    <>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select required={required} value={value} onChange={(e) => select(e)}>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
});
