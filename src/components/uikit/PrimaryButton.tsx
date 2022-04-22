import { FC, memo } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  onClick: () => void;
  label: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#4dd0e1",
    color: "#ffff",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    [theme.breakpoints.down("sm")]: {
      fontSize: 11,
    },
  },
}));

export const PrimaryButton: FC<Props> = memo((props) => {
  const { onClick, label } = props;

  const classes = useStyles();

  return (
    <>
      <Button className={classes.button} variant="contained" onClick={onClick}>
        {label}
      </Button>
    </>
  );
});
