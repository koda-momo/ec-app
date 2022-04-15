import { createSelector } from "reselect";
import { itemType } from "./types";

//アイテムの全情報取得
const itemSelector = (state: itemType) => state.items;

/**
 * アイテムの名前取得.
 */
export const getItemName = createSelector(
  [itemSelector],
  (state) => state.itemName
);

/**
 * アイテムの画像データ取得.
 */
export const getItemImage = createSelector(
  [itemSelector],
  (state) => state.itemImage
);
