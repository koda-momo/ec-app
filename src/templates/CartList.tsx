import { useCallback } from "react";
import { userType } from "../reducks/users/types";

//component
import { GrayButton } from "../components/uikit/GrayButton";
import { CartListItem } from "../components/products/CartListItem";
import { PrimaryButton } from "../components/uikit/PrimaryButton";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selecoters";
import { push } from "connected-react-router";

//MUI
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

/**
 * カート情報.
 */
export const CartList = () => {
  //selectorでカート情報取得
  const selector = useSelector((state: { users: userType }) => state);
  const productsInCart = getProductsInCart(selector);

  //dispatch
  const dispatch = useDispatch();

  //CSS
  const classes = useStyles();

  /**
   * 注文画面に進む.
   */
  const goToOder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  /**
   * ホームに戻る.
   */
  const goToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <>
      <section className="c-section-wrapin">
        <h2 className="u-text__headline">ショッピングカート</h2>
        <List className={classes.root}>
          {productsInCart.length > 0 &&
            productsInCart.map((product) => (
              <CartListItem product={product} key={product.cartId} />
            ))}
        </List>

        <div className="module-spacer--medium" />
        <div className="p-grid__column">
          <PrimaryButton label="レジへ進む" onClick={goToOder} />
          <div className="module-spacer--extra-small" />
          <GrayButton label="ショッピングを続ける" onClick={goToHome} />
        </div>
      </section>
    </>
  );
};

export default CartList;
