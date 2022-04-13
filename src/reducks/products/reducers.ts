//ActionsフォルダのActionsを全てインポート
import * as Actions from "./actions";
//初期値のインポート
import initialState from "../store/initialState";
//型
import { PayloadAction } from "@reduxjs/toolkit";
import { userActionType } from "../users/type";

/**
 *
 */
export const ProductsReducer = (
  state = initialState.products,
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
     * 当てはまらなければ.
     */
    default:
      return state;
  }
};
