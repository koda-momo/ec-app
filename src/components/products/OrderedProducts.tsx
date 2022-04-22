import { FC, memo, useCallback } from "react";
import { PrimaryButton } from "../uikit/PrimaryButton";

//MUI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { orderProductsType } from "../../reducks/products/types";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
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
    //普段
    display: "block",
    width: "100%",
    //スマホサイズの場合
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  responsiveText: {
    //普段
    display: "none",
    //スマホサイズの場合
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%",
    },
  },
}));

type Props = {
  products: orderProductsType[];
};

/**
 * 注文商品情報.
 */
export const OrderedProducts: FC<Props> = memo(({ products }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * 商品詳細ページに遷移.
   */
  const gotoProductDetail = useCallback(
    (id: string) => {
      dispatch(push(`/product/${id}`));
    },
    [dispatch]
  );

  /**
   * 長い文字を入れると途中から…にしてくれるメソッド.
   */
  const responsiveProductName = useCallback((name: string) => {
    let fixName = "";
    if (name.length > 5) {
      fixName = name.substring(0, 6) + "...";
    }
    return fixName;
  }, []);

  return (
    <>
      <List>
        {products.map((product, i) => (
          <div key={i}>
            <ListItem className={classes.list}>
              <ListItemAvatar>
                <img
                  className={classes.image}
                  alt="注文商品の画像"
                  src={product.images[0].path}
                />
              </ListItemAvatar>
              <div className={classes.text}>
                <ListItemText
                  primary={product.name}
                  secondary={`出版日:${product.publications}`}
                />
                <ListItemText primary={`\xA5${product.price}`} />
              </div>
              <div className={classes.responsiveText}>
                <ListItemText primary={responsiveProductName(product.name)} />
                <ListItemText primary={`\xA5${product.price}`} />
              </div>
              <PrimaryButton
                label="商品詳細"
                onClick={() => gotoProductDetail(product.id)}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
});
