import { createSelector } from "reselect";
import { productsType } from "./types";

const productsSelector = (state: { products: { list: [productsType] } }) =>
  state;

/**
 * 全商品情報取得.
 */
export const getProducts = createSelector([productsSelector], (state) => state);
