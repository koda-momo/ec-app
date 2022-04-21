import { useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getOrdersHistory, getUserName } from "../reducks/users/selecoters";

//MUI
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { userType } from "../reducks/users/types";
import { fetchOrderHistory } from "../reducks/users/operations";
import { OrderHistoryItem } from "../components/products/OrderHistoryItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    orderList: {
      background: theme.palette.grey["100"],
      margin: "0 auto",
      padding: 32,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: 768,
      },
    },
  })
);
const OrderHistory = () => {
  const selector = useSelector((state: { users: userType }) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const orders = getOrdersHistory(selector);

  /**
   * 最初にFirebaseから取得するActions発動.
   */
  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <>
      <section className="c-section-wrapin">
        <h2 className="u-text__headline">注文履歴</h2>
        {orders.length > 0 ? (
          <List className={classes.orderList}>
            {orders.map((order) => (
              <OrderHistoryItem order={order} key={order.id} />
            ))}
          </List>
        ) : (
          "注文履歴がありません"
        )}
      </section>
    </>
  );
};
export default OrderHistory;
