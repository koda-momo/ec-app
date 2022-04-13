import { push } from "connected-react-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { Dispatch } from "react";
import { db, FirebaseTimestamp } from "../../firebase";

const productsRef = collection(db, "products");

/**
 * 商品を新規登録.
 */
export const saveProduct = (
  name: string,
  description: string,
  category: string,
  field: string,
  price: string
) => {
  return async (dispatch: Dispatch<unknown>) => {
    //タイムスタンプの作成
    const timestamp = FirebaseTimestamp.now();

    //idの作成
    const ref = doc(productsRef);
    const id = ref.id;

    const data = {
      id: id,
      name: name,
      desctiption: description,
      category: category,
      field: field,
      //文字列→10進数に変更
      price: parseInt(price, 10),
      created_at: timestamp,
      update: timestamp,
    };

    return setDoc(doc(productsRef, id), data).then(() => {
      dispatch(push("/"));
    });
  };
};
