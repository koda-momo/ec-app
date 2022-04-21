import { PayloadAction } from "@reduxjs/toolkit";
import { productsType } from "../products/types";
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
  userImage: string;
}) => {
  return {
    type: "SIGN_IN", //依頼名
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.id,
      userName: userState.userName,
      userImage: userState.userImage,
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

export const fetchProductsInCartAction = (cart: Array<cartType>) => {
  return {
    type: "FETCH_PRODUCTS_IN_CARTACTION",
    payload: cart,
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

/**
 * お気に入りの取得.
 * @params favoList - お気に入りした商品情報
 */
export const FETCH_FAVO_ACTION = "FETCH_FAVO_ACTION";
export const fetchFavoAction = (favoList: Array<productsType>) => {
  return {
    type: "FETCH_FAVO_ACTION",
    payload: favoList,
  };
};
