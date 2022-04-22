import { memo, FC } from "react";

//MUI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

//icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

//css
import { makeStyles, createStyles } from "@material-ui/core/styles";

type Props = {
  publications: Array<{ publication: string; quantity: number }>; //出版日
  addProduct: (selectedPublication: string) => void;
};

//CSS
const useStyles = makeStyles((theme) =>
  createStyles({
    iconCell: {
      padding: 0,
      height: 20,
      width: 20,
    },
    publication: {
      fontSize: 13,
      //スマホサイズの場合
      [theme.breakpoints.down("sm")]: {
        fontSize: 11,
      },
    },
    soldOut: {
      fontSize: 13,
      width: 100,
      textAlign: "center",
      color: "red",
    },
  })
);

/**
 * 出版日を表示するテーブル.
 */
export const PublicationTable: FC<Props> = memo(
  ({ publications, addProduct }) => {
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
                      <div className={classes.publication}>
                        出版日:{item.publication}
                      </div>
                    </TableCell>
                    <TableCell>残り:{item.quantity}点</TableCell>
                    <TableCell className={classes.iconCell}>
                      {item.quantity > 0 ? (
                        <IconButton
                          onClick={() => addProduct(item.publication)}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      ) : (
                        <div className={classes.soldOut}>売切</div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
);
