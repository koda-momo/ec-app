import { FC, memo, useCallback } from "react";
import { TextDetail } from "../uikit/TextDetail";
import { orderHisType } from "../../reducks/users/types";
import { format } from "date-fns";

//MUI
import Divider from "@material-ui/core/Divider";
import { OrderedProducts } from "./OrderedProducts";

type Props = { order: orderHisType };

/**
 * 注文履歴1つ1つ.
 */
export const OrderHistoryItem: FC<Props> = memo(({ order }) => {
  /**
   * 日付を時間も含め整形.
   * @params date - 日付
   */
  const dateTimeToString = useCallback((date: Date): string => {
    return format(date, "yyyy-MM-dd hh:mm:ss");
  }, []);

  /**
   * 日付を整形.
   * @params date - 日付
   */
  const dateToString = useCallback((date: Date): string => {
    return format(date, "yyyy-MM-dd");
  }, []);

  //注文日
  const orderDateTime = dateTimeToString(order.created_at.toDate());

  //発送日
  const shippingDate = dateToString(order.shipping_date.toDate());

  //金額
  const price = `\xA5${order.amount.toLocaleString()}`;

  return (
    <>
      <div className="module-spacer--small" />
      <TextDetail label="注文ID" value={order.id} />
      <TextDetail label="注文日時" value={orderDateTime} />
      <TextDetail label="発送予定日" value={shippingDate} />
      <TextDetail label="注文金額" value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <div className="module-spacer--extra-small" />

      <Divider />
    </>
  );
});
