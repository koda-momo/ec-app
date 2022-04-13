//文字列を定数に入れてあげる(Reducerで使う際に依頼名を判断するため)
export const SIGN_IN = "SIGN_IN";

/**
 * 商品を追加する.
 * @param userState
 * @returns
 */
export const saveProductAction = (userState: {
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
