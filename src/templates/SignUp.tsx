import { push } from "connected-react-router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ImageArea } from "../components/products/ImageArea";
import { PrimaryButton } from "../components/uikit/PrimaryButton";
import { TextInput } from "../components/uikit/TextInput";
import { signUp } from "../reducks/users/operations";
import NoImage from "../assets/images/no_image.png";

/**
 * ユーザ情報新規登録.
 */
export const SignUp = () => {
  //dispatchを使用
  const dispatch = useDispatch();

  //ユーザの名前
  const [userName, setUserName] = useState("");

  //メールアドレス
  const [email, setEmail] = useState("");

  //パスワード
  const [password, setPassword] = useState("");

  //確認用パスワード
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * 名前の入力.
   */
  const inputUserName = useCallback((e) => {
    setUserName(e.target.value);
  }, []);

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

  /**
   * 確認用パスワードの入力.
   */
  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value);
  }, []);

  const [images, setImages] = useState<Array<{ id: string; path: string }>>([]);

  return (
    <>
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">アカウント登録</h2>
        <div className="module-spacer--medium" />

        <ImageArea images={images} setImages={setImages} />

        <TextInput
          fullWidth={true}
          label="ユーザ名"
          multiline={false}
          required={true}
          rows={1}
          value={userName}
          type="text"
          onChange={inputUserName}
        />

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

        <TextInput
          fullWidth={true}
          label="パスワード(再確認)"
          multiline={false}
          required={true}
          rows={1}
          value={confirmPassword}
          type="password"
          onChange={inputConfirmPassword}
        />

        <div className="center">
          <div className="module-spacer--medium" />
          <PrimaryButton
            label="アカウントを登録する"
            onClick={() =>
              dispatch(
                signUp(
                  userName,
                  email,
                  password,
                  confirmPassword,
                  images[0].path
                )
              )
            }
          />
          <div className="module-spacer--medium" />
          <p onClick={() => dispatch(push("/signin"))}>
            アカウントを既にお持ちの方はこちら
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
