import { push } from "connected-react-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { Dispatch } from "react";
import { db, FirebaseTimestamp } from "../../firebase";

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
