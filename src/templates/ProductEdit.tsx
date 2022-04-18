import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ImageArea } from "../components/products/ImageArea";
import { SetPublicationArea } from "../components/products/SetPublicationArea";
import { PrimaryButton } from "../components/uikit/PrimaryButton";
import { SelectBox } from "../components/uikit/SelectBox";
import { TextInput } from "../components/uikit/TextInput";
import { db } from "../firebase";
import { saveProduct } from "../reducks/products/operations";

/**
 * 商品編集.
 */
export const ProductEdit = () => {
  const dispatch = useDispatch();

  //画像データの配列
  const [images, setImages] = useState<Array<{ id: string; path: string }>>([]);
  //商品名
  const [name, setName] = useState("");
  //詳細
  const [description, setDescription] = useState("");
  //カテゴリ
  const [category, setCategory] = useState("");
  //分野
  const [field, setField] = useState("");
  //価格
  const [price, setPrice] = useState("");
  //発行日と数量
  const [publications, setPublications] = useState<
    Array<{ publication: string; quantity: number }>
  >([]);
  //商品id
  const [id, setId] = useState("");
  //登録日
  const [create, setCreate] = useState<{
    seconds: number;
    nanoseconds: number;
  }>({ seconds: 0, nanoseconds: 0 });

  //カテゴリ一覧
  const [categories] = useState([
    { id: "react", name: "React" },
    { id: "next", name: "Next.js" },
    { id: "vue", name: "Vue.js" },
    { id: "design", name: "デザイン" },
    { id: "php", name: "PHP" },
  ]);

  //分野
  const [fields] = useState([
    { id: "client", name: "フロント" },
    { id: "other", name: "その他" },
    { id: "server", name: "サーバ" },
  ]);

  /**
   * 商品名の入力.
   */
  const inputName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  /**
   * 商品詳細の入力.
   */
  const inputDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  /**
   * 価格の入力.
   */
  const inputPrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);

  /**
   * URLからIDを取得してIDを基に製品情報の取得(編集モードの初期値).
   */
  useEffect(() => {
    //URLの/edit/の後ろからIDを取得
    setId(window.location.pathname.split("/edit/")[1]);
    //DBから製品情報取得(db,"DB名",取得したい製品のID)
    id !== "" &&
      getDoc(doc(db, "products", id)).then((snapShot) => {
        const data = snapShot.data();
        if (data) {
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setField(data.field);
          setPrice(data.price);
          setPublications(data.publications);
          setCreate(data.created_at);
        }
      });
  }, [id]);

  return (
    <>
      <section>
        <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
        <div className="c-section-container">
          <ImageArea images={images} setImages={setImages} />
          <TextInput
            fullWidth={true}
            label="商品名"
            multiline={false}
            required={true}
            rows={1}
            value={name}
            type="text"
            onChange={inputName}
          />
          <TextInput
            fullWidth={true}
            label="商品説明"
            multiline={true}
            required={true}
            rows={5}
            value={description}
            type="text"
            onChange={inputDescription}
          />
          <SelectBox
            required={true}
            value={category}
            label="カテゴリ"
            select={setCategory}
            options={categories}
          />
          <SelectBox
            required={true}
            value={field}
            label="種類"
            select={setField}
            options={fields}
          />
          <TextInput
            fullWidth={true}
            label="価格"
            multiline={false}
            required={true}
            rows={1}
            value={price}
            type="number"
            onChange={inputPrice}
          />
          <div className="module-spacer--small" />
          <SetPublicationArea
            publications={publications}
            setPublications={setPublications}
          />
          <div className="module-spacer--small" />
          <div className="center">
            <PrimaryButton
              label="商品情報を保存"
              onClick={() => {
                dispatch(
                  saveProduct(
                    id,
                    images,
                    name,
                    description,
                    category,
                    field,
                    price,
                    publications,
                    create
                  )
                );
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductEdit;
