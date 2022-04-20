import { FC, memo } from "react";

//MUI
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  row: { display: "flex", flexFlow: "row wrap", marginBottom: 16 },
  label: {
    marginLeft: 0,
    marginRight: "auto",
  },
  value: {
    fontWeight: 600,
    marginLeft: "auto",
    marginRight: 0,
  },
});

type Props = {
  label: string;
  value: string;
};

export const TextDetail: FC<Props> = memo(({ label, value }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.row}>
        <div className={classes.label}>{label}</div>
        <div className={classes.value}>{value}</div>
      </div>
    </>
  );
});
