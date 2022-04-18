//ActionsフォルダのActionsを全てインポート
import * as Actions from "./actions";
//初期値のインポート
import initialState from "../store/initialState";
//型
import { PayloadAction } from "@reduxjs/toolkit";
import { productActionType } from "./types";

/**
 * 商品情報Resucer
 * @remarks stateの値書き換えない時はここを通さずoparationsのみでOK
 */
export const ProductsReducer = (
  state = initialState.products,
  action: PayloadAction<productActionType>
) => {
  switch (action.type) {
    //Actionsで作成した指示のどれを使うか
    /**
     * 商品情報の保存.
     */
    case Actions.FETCH_PRODUCTS:
      return {
        //state(初期値)とaction.payload(変更後の値)をマージする
        ...state,
        list: [...action.payload],
      };
    /**
     * 商品情報の削除.
     */
    case Actions.DELETE_PRODUCT:
      return {
        //state(初期値)とaction.payload(変更後の値)をマージする
        ...state,
        list: [...action.payload],
      };
    /**
     * 当てはまらなければ.
     */
    default:
      return state;
  }
};
