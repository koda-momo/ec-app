import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//CSS
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { productsType } from "../reducks/products/types";

//改行のためのライブラリ
import HTMLReactParser from "html-react-parser";
import { ImageSwiper } from "../components/products/ImageSwiper";
import { PublicationTable } from "../components/products/PublicationTable";

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
              <PublicationTable publications={product.publications} />
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
