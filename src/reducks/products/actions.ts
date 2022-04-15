import { productsType } from "./types";

//文字列を定数に入れてあげる(Reducerで使う際に依頼名を判断するため)
export const SAVE_PRODUCT = "SAVE_PRODUCT";

/**
 * 商品を追加する.
 * @param userState
 * @returns
 */
export const saveProductAction = (productState: {
  name: string;
  description: string;
  category: string;
  field: string;
  price: string;
}) => {
  return {
    type: "SAVE_PRODUCT", //依頼名
    payload: {},
  };
};

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products: Array<productsType>) => {
  return {
    type: "FETCH_PRODUCTS", //依頼名
    payload: products,
  };
};
