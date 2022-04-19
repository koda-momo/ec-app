import { FC, memo } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

type Props = {
  onClick: () => void;
  label: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.grey["300"],
    color: "#000",
    fontsize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
}));

/**
 * 灰色のボタン.
 */
export const GrayButton: FC<Props> = memo((props) => {
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
