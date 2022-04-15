import React, {
  FC,
  memo,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
//MUI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

//icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//css
import { makeStyles } from "@material-ui/styles";

//other
import { TextInput } from "../uikit/TextInput";

type Props = {
  publications: Array<{ publication: string; quantity: number }>; //発行日と数量
  setPublications: Dispatch<
    SetStateAction<
      {
        publication: string;
        quantity: number;
      }[]
    >
  >;
};

//CSS
const useStyles = makeStyles({
  iconCell: {
    height: 20,
    width: 20,
  },
  checkIcon: {
    float: "right",
  },
  inputAll: {
    display: "flex",
    textAlign: "center",
    gap: 4,
  },
  inputText: {
    width: 300,
  },
  backGround: {
    width: "auto",
    padding: 20,
  },
});

/**
 * 発行日と数量入力コンポーネント.
 */
export const SetPublicationArea: FC<Props> = memo(
  ({ publications, setPublications }) => {
    const classes = useStyles();

    //インデックス番号
    const [index, setIndex] = useState(0);
    //発行日
    const [publication, setPublication] = useState("2000-01-01");
    //数量
    const [quantity, setQuantity] = useState(0);

    //発行日の入力
    const inputPublication = useCallback((e) => {
      setPublication(e.target.value);
    }, []);

    //数量の入力
    const inputQuantity = useCallback((e) => {
      setQuantity(e.target.value);
    }, []);

    /**
     * 発行日、数量を追加、編集
     */
    const addPublication = useCallback(
      (index: number, publication: string, quantity: number) => {
        if (publication === "" || quantity === 0) {
          alert("タイプと数量を入力して下さい");
          return false;
        }

        //新規追加の場合の処理
        if (index === publications.length) {
          setPublications((prevState) => [
            ...prevState,
            { publication: publication, quantity: quantity },
          ]);
          setIndex(index + 1);
          setPublication("2000-01-01");
          setQuantity(0);
        } else {
          //編集の場合
          const newTypes = publications;
          newTypes[index] = { publication: publication, quantity: quantity };
          //初期値に戻す
          setIndex(publications.length);
          setPublication("2000-01-01");
          setQuantity(0);
        }
      },
      [publications, setPublications]
    );

    /**
     * 編集.
     */
    const editPublication = useCallback(
      (index: number, publication: string, quantity: number) => {
        setIndex(index);
        setPublication(publication);
        setQuantity(quantity);
      },
      []
    );

    /**
     * 削除.
     */
    const deletePublication = useCallback(
      (deleteIndex: number) => {
        const newPublications = publications.filter(
          (item, i) => i !== deleteIndex
        );
        setPublications(newPublications);
      },
      [publications, setPublications]
    );

    /**
     * 商品情報編集時は、初期値0でないのでlengthを入れておく.
     */
    useMemo(() => {
      setIndex(publications.length);
    }, [publications.length]);

    return (
      <>
        <div>
          <TableContainer component={Paper} className={classes.backGround}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>発行日</TableCell>
                  <TableCell>数量</TableCell>
                  <TableCell className={classes.iconCell} />
                  <TableCell className={classes.iconCell} />
                </TableRow>
              </TableHead>
              <TableBody>
                {publications.length > 0 &&
                  publications.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.publication}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            editPublication(i, item.publication, item.quantity)
                          }
                        >
                          <EditIcon className={classes.iconCell} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => deletePublication(i)}>
                          <DeleteIcon className={classes.iconCell} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className={classes.inputAll}>
              <div className={classes.inputText}>
                <TextInput
                  fullWidth={false}
                  label="発行月"
                  multiline={false}
                  type="date"
                  required={true}
                  onChange={(e) => inputPublication(e)}
                  rows={1}
                  value={publication}
                />
              </div>
              <div className={classes.inputText}>
                <TextInput
                  fullWidth={false}
                  label="数量"
                  multiline={false}
                  type="number"
                  required={true}
                  onChange={(e) => inputQuantity(e)}
                  rows={1}
                  value={quantity}
                />
              </div>

              <IconButton
                onClick={() => addPublication(index, publication, quantity)}
              >
                <CheckCircleIcon className={classes.checkIcon} />
              </IconButton>
            </div>
          </TableContainer>
        </div>
      </>
    );
  }
);
