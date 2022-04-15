//ActionsフォルダのActionsを全てインポート
import * as Actions from "./actions";
//初期値のインポート
import initialState from "../store/initialState";
//型
import { PayloadAction } from "@reduxjs/toolkit";
import { itemActionType } from "./types";

export const ItemReducer = (
  state = initialState.users,
  action: PayloadAction<itemActionType>
) => {
  switch (action.type) {
    //Actionsで作成した指示のどれを使うか
    /**
     * ポケモン情報取得.
     */
    case Actions.GET_POKE:
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
