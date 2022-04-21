import { FC, memo, useCallback } from "react";
import { favoType } from "../../reducks/users/types";

//redux
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

//MUI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    backgroundColor: "#fff",
    height: "auto",
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

type Props = {
  favoItem: favoType;
  deleteFavoItem: (id: string) => void;
};

/**
 * お気に入り商品情報.
 */
export const FavoItem: FC<Props> = memo(({ favoItem, deleteFavoItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const product = favoItem.productItem;

  /**
   * 商品詳細ページに遷移.
   */
  const gotoProductDetail = useCallback(
    (id: string) => {
      dispatch(push(`/product/${id}`));
    },
    [dispatch]
  );

  return (
    <>
      <List>
        <ListItem className={classes.list}>
          <ListItemAvatar>
            <img
              className={classes.image}
              alt="注文商品の画像"
              src={product.images[0].path}
              onClick={() => gotoProductDetail(product.id)}
            />
          </ListItemAvatar>
          <div className={classes.text}>
            <ListItemText
              primary={product.name}
              secondary={`出版日:${product.publications}`}
            />
            <ListItemText primary={`\xA5${product.price}`} />
          </div>
          <IconButton onClick={() => deleteFavoItem(favoItem.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        <Divider />
      </List>
    </>
  );
});
