import { useMemo, useCallback } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getProductsInCart } from "../reducks/users/selecoters";

//component
import { CartListItem } from "../components/products/CartListItem";
import { PrimaryButton } from "../components/uikit/PrimaryButton";

//MUI
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { userType } from "../reducks/users/types";
import { TextDetail } from "../components/uikit/TextDetail";
import { orderProduct } from "../reducks/products/operations";

const useStyles = makeStyles((theme) =>
  createStyles({
    detailBox: {
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: 320,
      },
      [theme.breakpoints.up("md")]: {
        width: 512,
      },
    },
    orderBox: {
      border: "1px xolid rgba(0,0,0,0.2)",
      borderRadius: 4,
      boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
      height: 256,
      margin: "24px auto 16px auto",
      padding: 16,
      width: 288,
    },
  })
);

/**
 * 注文確認画面.
 */
const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: { users: userType }) => state);
  const productInCart = getProductsInCart(selector);

  /**
   * 合計金額.
   * @remarks useMemo:[]内の数字が変わったら発動(useEffectとの違いは…？)
   */
  const subTotal = useMemo(() => {
    //sum=前回の結果が入る(productのpriceを足していく)
    //0=sumの初期値
    return productInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productInCart]);

  //消費税
  const tax = subTotal * 0.1;

  /**
   * 送料.
   * @remarks 1万円以上で無料
   */
  const shippingFee = subTotal >= 10000 ? 0 : 210;

  //税込合計金額
  const total = subTotal + shippingFee + tax;

  /**
   * 注文する.
   */
  const order = useCallback(() => {
    dispatch(orderProduct(productInCart, total));
  }, [dispatch, productInCart, total]);

  return (
    <>
      <section className="c-section-wrapin">
        <h2 className="u-text__headline">注文の確認</h2>
      </section>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productInCart.length > 0 &&
              productInCart.map((product, index) => (
                <CartListItem product={product} key={index} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label="商品合計"
            value={`\xA5${subTotal.toLocaleString()}`}
          />
          <TextDetail label="消費税" value={`\xA5${tax.toLocaleString()}`} />
          <TextDetail label="送料" value={`\xA5${shippingFee}`} />
          <Divider />
          <TextDetail
            label="合計(税込)"
            value={`\xA5${total.toLocaleString()}`}
          />
          <PrimaryButton label="注文する" onClick={order} />
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
