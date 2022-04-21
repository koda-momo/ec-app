import { PayloadAction } from "@reduxjs/toolkit";
import { cartType, orderHisType } from "./types";

//文字列を定数に入れてあげる(Reducerで使う際に依頼名を判断するため)
export const SIGN_IN = "SIGN_IN";

//isSignedInをtrueに、uidにはこれを入れる、userNameにはこれを入れるという指示
//今回代入でuserState使うから引数で受け取っているけれど、必要なければ不要
/**
 * サインイン.
 */
export const signInAction = (userState: {
  id: string;
  role: string;
  userName: string;
}) => {
  return {
    type: "SIGN_IN", //依頼名
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.id,
      userName: userState.userName,
    },
  };
};

/**
 * サインアウト.
 */
export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
  return {
    type: "SIGN_OUT", //依頼名
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      userName: "",
    },
  };
};

/**
 * カート情報の書き換え.
 */
export const FETCH_PRODUCTS_IN_CARTACTION = "FETCH_PRODUCTS_IN_CARTACTION";

export const fetchProductsInCartAction = (
  products: Array<cartType>
): PayloadAction<
  { products: Array<cartType> },
  typeof FETCH_PRODUCTS_IN_CARTACTION
> => {
  return {
    type: "FETCH_PRODUCTS_IN_CARTACTION",
    payload: {
      products,
    },
  };
};

/**
 * 注文履歴情報の書き換え.
 */
export const FETCH_ORDER_HISTORY_ACTION = "FETCH_ORDER_HISTORY_ACTION";

export const fetchOrderHistoryAction = (history: Array<orderHisType>) => {
  return {
    type: "FETCH_ORDER_HISTORY_ACTION",
    payload: history,
  };
};
