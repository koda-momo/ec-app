import { memo, FC } from "react";

//MUI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

//icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

//css
import { makeStyles } from "@material-ui/styles";

type Props = {
  publications: Array<{ publication: string; quantity: number }>; //出版日
};

//CSS
const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 20,
    width: 20,
  },
  publication: {
    fontSize: 13,
  },
});

/**
 * 出版日を表示するテーブル.
 */
export const PublicationTable: FC<Props> = memo(({ publications }) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {publications.length > 0 &&
              publications.map((item, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <div className={classes.publication}>出版日:</div>
                    <div className={classes.publication}>
                      {item.publication}
                    </div>
                  </TableCell>
                  <TableCell>残り:{item.quantity}点</TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton>
                      {item.quantity > 0 ? (
                        <ShoppingCartIcon />
                      ) : (
                        <div> 売切</div>
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});
