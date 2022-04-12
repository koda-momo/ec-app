import { push } from "connected-react-router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../components/uikit/PrimaryButton";
import { TextInput } from "../components/uikit/TextInput";
import { signIn } from "../reducks/users/operations";

/**
 * サインイン.
 */
export const SignIn = () => {
  //dispatchを使用
  const dispatch = useDispatch();

  //メールアドレス
  const [email, setEmail] = useState("");

  //パスワード
  const [password, setPassword] = useState("");

  /**
   * メールアドレスの入力.
   */
  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  /**
   * パスワードの入力.
   */
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <>
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">サインイン</h2>
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true}
          label="メールアドレス"
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type="email"
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label="パスワード"
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type="password"
          onChange={inputPassword}
        />
        <div className="center">
          <div className="module-spacer--medium" />
          <PrimaryButton
            label="サインイン"
            onClick={() => dispatch(signIn(email, password))}
          />
          <div className="module-spacer--medium" />
          <p onClick={() => dispatch(push("/signup"))}>
            アカウントをお持ちでない方はこちら
          </p>
          <p onClick={() => dispatch(push("/signin/reset"))}>
            パスワードを忘れた方はこちら
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
