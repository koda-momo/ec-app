import { createSelector } from "reselect";
import { userType } from "./types";

const userSelector = (state: { users: userType }) => state.users;

/**
 * ID取得.
 */
export const getUserId = createSelector([userSelector], (state) => state.uid);

/**
 * ユーザ名取得.
 */
export const getUserName = createSelector(
  [userSelector],
  (state) => state.userName
);

/**
 * 画像パス名取得.
 */
export const getUserImage = createSelector(
  [userSelector],
  (state) => state.userImage
);

/**
 * 現在サインインしているか否か.
 */
export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

/**
 * カート情報取得.
 */
export const getProductsInCart = createSelector(
  [userSelector],
  (state) => state.cart
);

/**
 * 注文履歴取得.
 */
export const getOrdersHistory = createSelector(
  [userSelector],
  (state) => state.orders
);

/**
 * お気に入り情報取得.
 */
export const getFavoList = createSelector(
  [userSelector],
  (state) => state.favoList
);
