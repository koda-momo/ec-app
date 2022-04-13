import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ImageArea } from "../components/products/ImageArea";
import { PrimaryButton } from "../components/uikit/PrimaryButton";
import { SelectBox } from "../components/uikit/SelectBox";
import { TextInput } from "../components/uikit/TextInput";
import { saveProduct } from "../reducks/products/operations";

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
          <div className="module-spacer--medium" />
          <div className="center">
            <PrimaryButton
              label="商品情報を保存"
              onClick={() =>
                dispatch(
                  saveProduct(images, name, description, category, field, price)
                )
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductEdit;
