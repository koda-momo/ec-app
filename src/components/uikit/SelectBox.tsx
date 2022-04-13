import { ChangeEvent, Dispatch, FC, memo, SetStateAction, useRef } from "react";
//MUI
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";

type Props = {
  required: boolean;
  value: string;
  label: string;
  select: Dispatch<SetStateAction<string>>;
  options: Array<{ id: string; name: string }>;
};

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: "100%",
  },
});

export const SelectBox: FC<Props> = memo((props) => {
  const { required, label, value, select, options } = props;

  //CSSを整える
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          required={required}
          value={value}
          onChange={(e: ChangeEvent<any>) => select(e.target.value)}
        >
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
