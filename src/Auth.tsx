import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reducks/users/operations";
import { getIsSignedIn } from "./reducks/users/selecoters";
import { userType } from "./reducks/users/type";

type Props = {
  children: ReactNode;
};

const Auth: FC<Props> = ({ children }) => {
  //dispatchを使う
  const dispatch = useDispatch();

  //stateから値(サインインしているか否か)の取得
  const selector = useSelector((state: { users: userType }) => state);
  const isSignedIn = getIsSignedIn(selector);

  /**
   * サインインしていなければ発動
   */
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  //サインインしていない場合の画面表示
  if (!isSignedIn) {
    return <></>;
  }

  return <>{children}</>;
};

export default Auth;
