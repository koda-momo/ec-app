import { push } from "connected-react-router";
import { Dispatch } from "react";
import { signInAction, signOutAction } from "./actions";

//firebase
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

/**
 * signup.
 */
export const signUp = (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch: Dispatch<unknown>) => {
    //validation
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です。");
      //途中で離脱の場合は、falseを返す
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力して下さい。");
      return false;
    }

    //ＦirebaseのAuthにユーザ情報登録
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result: any) => {
        const user = result.user;
        //ユーザがキチンと登録されたかどうか
        if (user) {
          //ユーザの情報
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            userName: userName,
          };

          //ユーザ情報をFirebaseのDBにも登録(該当のidに情報を入れる)
          setDoc(doc(db, "users", uid), userInitialData)
            //成功したら
            .then(() => {
              dispatch(push("/"));
            });
        }
      }
    );
  };
};

/**
 * signin.
 */
export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<unknown>) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    //Firebaseのサインイン機能
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result: { user: any }) => {
        //サインインして返ってきたデータ
        const user = result.user;

        //もしサインインに成功してuserが返ってきていたら、Stateにログインユーザの情報を代入
        if (user) {
          const uid = user.uid;

          //DBからID取得(db,"DB名",取得したいユーザのID)
          const snapShot = await getDoc(doc(db, "users", uid));
          const data = snapShot.data();

          //Stateに代入
          if (data) {
            dispatch(
              signInAction({
                id: data.uid,
                role: data.role,
                userName: data.userName,
              })
            );
          }
          dispatch(push("/"));
        }
      })
      //サインインエラー処理
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          alert("メールアドレスの登録がありません");
          return false;
        }
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          alert("パスワードが間違えています");
          return false;
        }
        alert("サインインに失敗しました");
      });
  };
};

/**
 * 認証のメソッド.
 */
export const listenAuthState = () => {
  return async (dispatch: Dispatch<unknown>) => {
    return auth.onAuthStateChanged(async (user) => {
      //認証(サインイン)済であれば
      if (user) {
        const uid = user.uid;

        //DBからID取得(db,"DB名",取得したいユーザのID)
        const snapShot = await getDoc(doc(db, "users", uid));
        const data = snapShot.data();

        //Stateに代入
        if (data) {
          dispatch(
            signInAction({
              id: data.uid,
              role: data.role,
              userName: data.userName,
            })
          );
        }
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

/**
 * singout.
 */
export const signOut = () => {
  return async (dispatch: Dispatch<unknown>) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signout"));
    });
  };
};

/**
 * resetPassword.
 */
export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch<unknown>) => {
    if (email === "") {
      alert("必須項目が未入力です。");
      return false;
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("パスワードリセットのメールを送信しました。");
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました。");
        });
    }

    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signout"));
    });
  };
};
