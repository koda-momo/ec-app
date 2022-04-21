import { memo, FC, useCallback } from "react";

//MUI
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

import { cartType, userType } from "../../reducks/users/types";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selecoters";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

type Props = {
  product: cartType; //カートの中身
};

/**
 * カートの中身1つ1つ.
 */
export const CartListItem: FC<Props> = memo(({ product }) => {
  const classes = useStyles();
  const selector = useSelector((state: { users: userType }) => state);
  const uid = getUserId(selector);
  const dispatch = useDispatch();

  const image = product.images[0].path;
  const price = product.price.toLocaleString();

  /**
   * カート内から対象のアイテムを削除する.
   * @param id - カートID
   */
  const removeProductFromCart = useCallback(
    (id: string | undefined) => {
      if (id) {
        return deleteDoc(doc(db, "users", uid, "cart", id));
      }
    },
    [uid]
  );

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img
            className={classes.image}
            src={image}
            alt="商品画像"
            onClick={() => dispatch(push(`/product/${product.productId}`))}
          />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={product.name}
            secondary={`出版日:${product.publication}`}
          />
          <ListItemText primary={`\xA5${price}`} />
        </div>
        <IconButton onClick={() => removeProductFromCart(product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
});
