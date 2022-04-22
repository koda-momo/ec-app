import { push } from "connected-react-router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { Dispatch } from "react";
import { db, FirebaseTimestamp } from "../../firebase";
import { cartType, userType } from "../users/types";
import { deleteProductAction, fetchProductsAction } from "./actions";
import { productsType, orderProductsType } from "./types";

const productsRef = collection(db, "products");

/**
 * 商品情報登録、編集.
 */
export const saveProduct = (
  id: string, //商品ID
  images: Array<{ id: string; path: string }>, //商品画像情報
  name: string, //商品名
  description: string, //商品の詳細
  category: string, //カテゴリ
  field: string, //分野
  price: string, //価格
  publications: Array<{ publication: string; quantity: number }>, //発行日と数量
  create: { seconds: number; nanoseconds: number } //作成日
) => {
  return async (dispatch: Dispatch<unknown>) => {
    //タイムスタンプの作成
    const timestamp = FirebaseTimestamp.now();

    //作成日の作成(新規なら今の時間)
    const createDate = create.seconds !== 0 ? create : timestamp;

    //IDの作成(新規なら新規にID作成)
    const ref = doc(productsRef);
    const postId = id !== "" ? id : ref.id;

    //登録するデータ
    const data = {
      id: postId,
      images: images,
      name: name,
      description: description,
      category: category,
      field: field,
      //文字列→10進数に変更
      price: parseInt(price, 10),
      publications: publications,
      created_at: createDate,
      update: timestamp,
    };

    // FirebaseのDBにデータを追加(setメソッド使用)、merge:trueを書くともしIDがあった際は上書き
    return setDoc(doc(productsRef, postId), data, { merge: true }).then(() => {
      dispatch(push("/"));
    });
  };
};

/**
 * 商品一覧の取得.
 * @returns
 */
export const fetchProducts = (
  field: string,
  category: string,
  search: string
) => {
  return async (dispatch: Dispatch<unknown>) => {
    //DBからデータの取得:並び替え(更新日順,降順)
    let q = query(productsRef, orderBy("update", "desc"));

    //もし分野で絞っていたら搾る設定をつけて叩く
    q =
      field !== ""
        ? query(
            productsRef,
            where("field", "==", field),
            orderBy("update", "desc")
          )
        : q;

    //もしカテゴリで絞っていたら搾る設定をつけて叩く
    q =
      category !== ""
        ? query(
            productsRef,
            where("category", "==", category),
            orderBy("update", "desc")
          )
        : q;

    //取得したデータを仮の配列にpush
    getDocs(q).then((snapshots) => {
      //仮の配列
      let productList = Array<productsType>();

      snapshots.forEach((snapshot) => {
        productList.push(snapshot.data() as productsType);
      });
      if (search !== "") {
        productList = productList.filter((product) =>
          product.name.toUpperCase().match(search)
        );
      }

      //Reduxの方も書き換え
      dispatch(fetchProductsAction(productList));
    });
  };
};

/**
 * 商品の削除.
 * @param id - 削除したい商品ID
 */
export const deleteProduct = (id: string) => {
  return async (
    dispatch: Dispatch<unknown>,
    getState: () => { products: { list: [productsType] } }
  ) => {
    //DBから削除
    await deleteDoc(doc(db, "products", id));

    //Reduxの方も書き換え
    const prevProducts = getState().products.list;
    const newPrevProducts = prevProducts.filter((item) => item.id !== id);
    dispatch(deleteProductAction(newPrevProducts));
  };
};

/**
 * 商品の注文.
 */
export const orderProduct = (
  productInCart: Array<cartType>, //注文商品
  amount: number //合計金額
) => {
  return async (
    dispatch: Dispatch<unknown>,
    getState: () => { users: userType }
  ) => {
    //サインインしているユーザのID
    const uid = getState().users.uid;

    //タイムスタンプの取得
    const timestamp = FirebaseTimestamp.now();

    //商品リスト
    let products = new Array<orderProductsType>();

    //売り切れ商品リスト(商品名だけ入る)
    let soldOutProducts = new Array<string>();

    //batchの使用
    const batch = writeBatch(db);

    //商品の品切れ状況確認(Firebaseからその商品の情報を１つずつ取得→確認)
    for (const product of productInCart) {
      //その商品が売り切れか否か
      let isSoleOut = false;
      const productSnapShot = await getDoc(
        doc(db, "products", product.productId)
      );
      const publications = productSnapShot.data()?.publications;

      //その出版日の商品の在庫があるか否か
      const updatePublications = publications.map(
        (publication: { publication: string; quantity: number }) => {
          if (publication.publication === product.publication) {
            //在庫切れの際
            if (publication.quantity === 0) {
              soldOutProducts.push(product.name);
              isSoleOut = true;
              return publication;
            } else {
              return {
                publication: publication.publication,
                quantity: publication.quantity - 1, //在庫は-1する
              };
            }
          } else {
            return publication;
          }
        }
      );

      // Firebaseの在庫書き換え
      setDoc(doc(db, "products", product.productId), {
        ...productSnapShot.data(),
        publications: updatePublications,
      });
      //その商品が在庫切れでなければ、カートから削除＆注文商品リストに追加
      if (!isSoleOut) {
        //注文商品配列の作成(注文履歴に使用)
        products.push({
          id: product.productId,
          images: product.images,
          name: product.name,
          price: product.price,
          publications: product.publication,
        });
        //Firebaseのカート書き換え(注文完了→カートを削除)
        await deleteDoc(doc(doc(db, "users", uid), "cart", product.cartId));
      }
    }

    //商品の在庫切れがあった場合発動(複数商品→配列の名前を「と」で繋ぐ)
    //全商品在庫切れ→return
    if (
      soldOutProducts.length > 0 &&
      soldOutProducts.length === productInCart.length
    ) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];

      alert(
        `大変申し訳ありません。${errorMessage}は在庫切れとなったため、注文処理を中断しました。`
      );
      return false;
      //一部在庫切れ
    } else if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];

      alert(
        `大変申し訳ありません。一部商品(${errorMessage})は在庫切れとなったため、購入できませんでした。`
      );
    }
    try {
      //特に問題ない場合は処理を実行
      const orderRef = doc(collection(db, "users", uid, "orders"));
      //今日から3日後を発送日としてそれをFirebaseのTimeStamp型に
      const date = timestamp.toDate();
      const shippingDate = FirebaseTimestamp.fromDate(
        new Date(date.setDate(date.getDate() + 3))
      );

      //注文情報作成
      const history = {
        amount: amount,
        created_at: timestamp,
        id: orderRef.id,
        products: products,
        shipping_date: shippingDate,
        updated_at: timestamp,
      };

      //注文情報をFirebaseのordersコレクションに格納
      setDoc(orderRef, history).then(() => {
        dispatch(push("/order/complete"));
      });
    } catch (e) {
      alert("処理が失敗しました。通信環境などをご確認下さい。");
    }
  };
};
