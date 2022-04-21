import { push } from "connected-react-router";
import { Dispatch } from "react";
import {
  fetchOrderHistoryAction,
  fetchProductsInCartAction,
  signInAction,
  signOutAction,
} from "./actions";

//firebase
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { cartType, orderHisType, userType } from "./types";

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
        if (error.message === "Quota exceeded.") {
          alert(
            "FireBaseのアクセス上限に達してしまいました。日を改めて下さい。"
          );
          return false;
        }

        alert("サインインに失敗しました");
      });
  };
};

/**
 * 認証のメソッド.
 * @remarks Firebaseの方でサインインしていればreduxの方もサインインにする
 */
export const listenAuthState = () => {
  return async (dispatch: Dispatch<unknown>) => {
    return auth.onAuthStateChanged(async (user) => {
      //認証(サインイン)済であれば
      if (user) {
        const uid = user.uid;

        //DBからID取得(db,"DB名",取得したいユーザのID)
        try {
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
        } catch (error) {
          dispatch(push("/signin"));
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

/**
 * カートに追加.
 */
export const addProductToCart = (cartData: cartType) => {
  return async (
    dispatch: Dispatch<unknown>,
    getState: () => { users: userType }
  ) => {
    //ログインしているユーザのIDをReduxから取得
    const uid = getState().users.uid;

    //Firebaseからカート情報新規追加
    const cartRef = doc(collection(db, "users", uid, "cart"));

    //受け取ったカート情報にカートIDを追加する
    const addedProduct = {
      ...cartData,
      cartId: cartRef.id,
    };

    //Firebaseにカート情報を追加
    await setDoc(cartRef, addedProduct);
    alert("商品をカートに追加しました");
    dispatch(push("/"));
  };
};

/**
 * Reduxのカート情報を書き換え.
 */
export const fetchProductsInCart = (products: Array<cartType>) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(fetchProductsInCartAction(products));
  };
};

/**
 * 注文履歴の取得.
 */
export const fetchOrderHistory = () => {
  return async (
    dispatch: Dispatch<unknown>,
    getState: () => { users: userType }
  ) => {
    const uid = getState().users.uid;

    //Firebaseから注文履歴の取得
    const ordersRef = collection(db, "users", uid, "orders");
    const q = query(ordersRef, orderBy("updated_at", "desc"));

    getDocs(q).then((snapshots) => {
      //仮の配列
      const productList: any[] = [];

      snapshots.forEach((snapshot) => {
        productList.push(snapshot.data());
      });
      //storeの注文履歴を書き換え
      dispatch(fetchOrderHistoryAction(productList));
    });
  };
};
