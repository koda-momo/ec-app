import { Timestamp } from "firebase/firestore";
import { orderProductsType } from "../products/types";

//カートタイプ
export type cartType = {
  cartId: string;
  added_at: Timestamp;
  description: string;
  field: string;
  images: Array<{ id: string; path: string }>;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  publication: string;
};

//ユーザタイプ
export type userType = {
  isSignedIn: boolean;
  uid: string;
  userName: string;
  cart: Array<cartType>;
  orders: Array<any>;
};

//Actionsで使用する型
export type userActionType = { payload: userType };
export type userCartActionType = { payload: Array<cartType> };

//注文履歴
export type orderHisType = {
  amount: number;
  created_at: Timestamp;
  id: string;
  products: Array<orderProductsType>;
  shipping_date: Timestamp;
  updated_at: Timestamp;
};
