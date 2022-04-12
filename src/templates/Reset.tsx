import { push } from "connected-react-router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../components/uikit/PrimaryButton";
import { TextInput } from "../components/uikit/TextInput";
import { resetPassword } from "../reducks/users/operations";

/**
 * パスワードリセット(メールを送ってくれる？).
 */
export const Reset = () => {
  //dispatchを使用
  const dispatch = useDispatch();

  //メールアドレス
  const [email, setEmail] = useState("");

  /**
   * メールアドレスの入力.
   */
  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  return (
    <>
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center"></h2>
        <div className="module-spacer--medium"></div>

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

        <div className="center">
          <div className="module-spacer--medium" />
          <PrimaryButton
            label="パスワードのリセット"
            onClick={() => dispatch(resetPassword(email))}
          />
          <div className="module-spacer--medium" />
          <p onClick={() => dispatch(push("/signin"))}>ログイン画面に戻る</p>
        </div>
      </div>
    </>
  );
};

export default Reset;
