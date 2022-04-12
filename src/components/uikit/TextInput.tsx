import { ChangeEventHandler, FC, memo } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const TextInput: FC<Props> = memo((props) => {
  const { fullWidth, label, multiline, required, rows, value, type, onChange } =
    props;

  return (
    <>
      <TextField
        fullWidth={fullWidth}
        label={label}
        margin="dense"
        multiline={multiline}
        required={required}
        minRows={rows}
        value={value}
        type={type}
        onChange={onChange}
      />
    </>
  );
});
