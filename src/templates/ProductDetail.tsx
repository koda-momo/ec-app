import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import { makeStyles } from "@material-ui/core/styles";

//Firebase
import { doc, getDoc } from "firebase/firestore";
import { db, FirebaseTimestamp } from "../firebase";
import { productsType } from "../reducks/products/types";

//改行のためのライブラリ
import HTMLReactParser from "html-react-parser";
import { ImageSwiper } from "../components/products/ImageSwiper";
import { PublicationTable } from "../components/products/PublicationTable";
import { addProductToCart } from "../reducks/users/operations";

//CSS
const useStyles = makeStyles((theme) => ({
  sliderbox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      //一番幅が狭いであろうスマホサイズ
      width: 320,
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      //一番幅が狭いであろうスマホサイズ
      width: 320,
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

/**
 * 商品詳細.
 */
export const ProductDetail = () => {
  //dispatchを使用
  const dispatch = useDispatch();
  //selectorを使用
  const selector = useSelector(
    (state: { router: { location: { pathname: string } } }) => state
  );
  //CSS
  const classes = useStyles();

  //パスからidの取得
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  //商品情報
  const [product, setProduct] = useState<productsType>();

  /**
   * 文章を改行して表示する.
   */
  const returnCodeToBr = (text: string) => {
    if (text === "") {
      return text;
    } else {
      //改行の文字を下記HTML(<br/>)に置き換える
      return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
  };

  /**
   * IDを基に商品情報を1件取得.
   */
  useEffect(() => {
    getDoc(doc(db, "products", id)).then((snapShot) => {
      const data = snapShot.data() as productsType;
      setProduct(data);
    });
  }, [id]);

  //金額表示を整える
  const formatPrice = product?.price.toLocaleString();

  /**
   * カートに商品を追加.
   */
  const addProduct = useCallback(
    (selectedPublication: string) => {
      //現在の時刻を取得
      const timestamp = FirebaseTimestamp.now();

      //カートの中身
      const cartData = product && {
        added_at: timestamp,
        description: product.description,
        field: product.field,
        images: product.images,
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
        publication: selectedPublication,
      };

      //Reduxを使用してstateに保存
      cartData && dispatch(addProductToCart(cartData));
    },
    [dispatch, product]
  );

  return (
    <>
      <section className="c-section-wrapin">
        {product && (
          <div className="p-grid__row">
            <div className={classes.sliderbox}>
              <ImageSwiper images={product.images} />
            </div>
            <div className={classes.detail}>
              <h2 className="u-text__headline">{product.name}</h2>
              <p className={classes.price}> &yen;{formatPrice}</p>
              <div className="module-spacer--small" />
              <PublicationTable
                publications={product.publications}
                addProduct={addProduct}
              />
              <div className="module-spacer--small" />
              <p>{returnCodeToBr(product.description)}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDetail;
