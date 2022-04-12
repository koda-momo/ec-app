//ActionsフォルダのActionsを全てインポート
import * as Actions from "./actions";
//初期値のインポート
import initialState from "../store/initialState";
//型
import { PayloadAction } from "@reduxjs/toolkit";
import { userActionType } from "./type";

/**
 * ユーザ情報の変更.
 * @params state - 今の値を設定(デフォルトは初期値)
 * @params action - 指示
 * @returns SIGN_IN → Actionsの指示に従って変更した値を返す
 * @returns default → 指示がない場合はstateの中身をそのまま返す
 */
export const UserReducer = (
  state = initialState.users,
  action: PayloadAction<userActionType>
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
     * 当てはまらなければ.
     */
    default:
      return state;
  }
};
