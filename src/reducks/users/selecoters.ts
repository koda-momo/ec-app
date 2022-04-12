import { createSelector } from "reselect";
import { userType } from "./type";

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
 * 現在サインインしているか否か.
 */
export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);
