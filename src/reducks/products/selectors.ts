import { createSelector } from "reselect";
import { productType } from "./types";

const userSelector = (state: { product: productType }) => state.product;

/**
 * 商品名取得.
 */
export const getUserId = createSelector([userSelector], (state) => state.name);
