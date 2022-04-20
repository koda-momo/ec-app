import { Timestamp } from "firebase/firestore";

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
};

//Actionsで使用する型
export type userActionType = { payload: userType };
export type userCartActionType = { payload: Array<cartType> };
