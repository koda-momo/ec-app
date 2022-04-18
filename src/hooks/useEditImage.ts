import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";

/**
 * Firebaseのstorageに画像を登録、削除出来るhook.
 * @param images - 画像データ
 * @param setImages -  画像データをsetする
 * @returns 画像登録、削除のメソッド
 */
export const useEditImage = (
  images: Array<{ id: string; path: string }>,
  setImages: Dispatch<SetStateAction<Array<{ id: string; path: string }>>>
) => {
  /**
   * 画像のアップロード.
   */
  const uploadImage = useCallback(
    async (e: ChangeEvent<any>) => {
      //取得した画像データをsotrageに保存できる形に整形
      const file = e.target.files;
      const blob = new Blob(file, { type: "image/jpeg" });

      //ファイル名生成:この中の文字を組み合わせた16桁ランダムに生成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWQYZ1234567890";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      //imagesディレクトリの中に「fileName.jpg」という名前でblobをアップロードするよ
      const storage = getStorage();
      const uploadRef = ref(storage, `images/${fileName}.jpg`);
      const uploadTask = uploadBytes(uploadRef, blob);
      const snapshot = await uploadTask;

      //アップロードが完了するとその画像が取得できるURLが返ってくる
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.dir("ダウンロードURL:" + JSON.stringify(downloadURL));

      //表示用画像配列の作成(この書き方をするとsetメソッド使用でも.pushしなくて良い)
      const newImage = { id: fileName, path: downloadURL };
      setImages((prevState: Array<{ id: string; path: string }>) => [
        ...prevState,
        newImage,
      ]);
    },
    [setImages]
  );

  /**
   * 画像の削除.
   */
  const deleteImage = useCallback(
    async (id: string) => {
      //アラートを出す
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        //削除対象画像を配列から削除
        const newImages = images.filter((image) => image.id !== id);
        //表示用配列の編集:削除済の配列をsetし直す
        setImages(newImages);
        //Firebaseのstorage編集:対象の画像を削除
        const desertRef = ref(storage, `images/${id}.jpg`);
        return await deleteObject(desertRef);
      }
    },
    [images, setImages]
  );

  return { uploadImage, deleteImage };
};
