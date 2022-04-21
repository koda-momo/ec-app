//ActionsフォルダのActionsを全てインポート
import * as Actions from "./actions";
//初期値のインポート
import initialState from "../store/initialState";
//型
import { PayloadAction } from "@reduxjs/toolkit";
import { userType, cartType } from "./types";

/**
 * ユーザ情報の変更.
 * @params state - 今の値を設定(デフォルトは初期値)
 * @params action - 指示
 * @returns SIGN_IN → Actionsの指示に従って変更した値を返す
 * @returns default → 指示がない場合はstateの中身をそのまま返す
 */
export const UserReducer = (
  state = initialState.users,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    //Actionsで作成した指示のどれを使うか
    /**
     * サインイン.
     */
    case Actions.SIGN_IN:
      return {
        //state(初期値)とaction.payload(変更後の値)をマージする
        ...state,
        ...action.payload,
      };
    /**
     * サインアウト.
     */
    case Actions.SIGN_OUT:
      return {
        //完全に代入するのでマージでなくてOK
        ...action.payload,
      };
    /**
     * カートに情報書き換え.
     */
    case Actions.FETCH_PRODUCTS_IN_CARTACTION:
      return {
        ...state,
        cart: [...action.payload],
      };
    /**
     * 注文履歴書き換え.
     */
    case Actions.FETCH_ORDER_HISTORY_ACTION:
      return {
        ...state,
        orders: [...action.payload],
      };
    /**
     * お気に入り情報書き換え.
     */
    case Actions.FETCH_FAVO_ACTION:
      return {
        ...state,
        favoList: [...action.payload],
      };

    /**
     * 当てはまらなければ.
     */
    default:
      return state;
  }
};
