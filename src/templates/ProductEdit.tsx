import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectBox } from "../components/uikit/SelectBox";
import { TextInput } from "../components/uikit/TextInput";

export const ProductEdit = () => {
  const dispatch = useDispatch();

  //商品名
  const [name, setName] = useState("");
  //詳細
  const [description, setDescription] = useState("");
  //カテゴリ
  const [category, setCategory] = useState("");
  //野菜か果物か
  const [kind, setKind] = useState("");
  //価格
  const [price, setPrice] = useState("");

  //カテゴリ一覧
  const [categories] = useState([
    { id: "carrot", name: "にんじん" },
    { id: "daikon", name: "大根" },
    { id: "poteto", name: "ジャガイモ" },
    { id: "onion", name: "玉ねぎ" },
    { id: "strawberry", name: "イチゴ" },
    { id: "banana", name: "バナナ" },
    { id: "apple", name: "りんご" },
  ]);

  //野菜か果物か
  const [kinds] = useState([
    { id: "vegetable", name: "野菜" },
    { id: "fruit", name: "果物" },
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
          商品画像を登録する
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
            value={kind}
            label="種類"
            select={setKind}
            options={kinds}
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
        </div>
      </section>
    </>
  );
};

export default ProductEdit;
