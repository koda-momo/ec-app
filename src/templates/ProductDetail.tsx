import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import { createStyles, makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

//Firebase
import { doc, getDoc } from "firebase/firestore";
import { db, FirebaseTimestamp } from "../firebase";
import { productsType } from "../reducks/products/types";

//改行のためのライブラリ
import HTMLReactParser from "html-react-parser";
import { ImageSwiper } from "../components/products/ImageSwiper";
import { PublicationTable } from "../components/products/PublicationTable";
import { addFavoList, addProductToCart } from "../reducks/users/operations";
import { IconButton } from "@material-ui/core";
import { userType } from "../reducks/users/types";
import { getFavoList } from "../reducks/users/selecoters";

//CSS
const useStyles = makeStyles((theme) =>
  createStyles({
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
    noItem: {
      color: "red",
    },
    priceAndFavo: {
      display: "flex",
      gap: 5,
      alignItems: "center",
    },
    iconCell: {
      padding: 0,
      height: 20,
      width: 20,
    },
    iconFavoCell: {
      color: "red",
      padding: 0,
      height: 20,
      width: 20,
    },
  })
);

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
  const favoSelector = useSelector((state: { users: userType }) => state);
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

  //お気に入り済か否か
  const [isFavo, setIsFavo] = useState<boolean>();

  /**
   * IDを基に商品情報を1件取得.
   */
  useEffect(() => {
    getDoc(doc(db, "products", id)).then((snapShot) => {
      const data = snapShot.data() as productsType;
      setProduct(data);

      //お気に入りリスト登録済商品か否か
      const favoList = getFavoList(favoSelector);
      for (const favo of favoList) {
        if (data.name === favo.productItem.name) {
          setIsFavo(true);
        }
      }
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
        cartId: "",
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

  /**
   * お気に入りに追加.
   */
  const addFavo = useCallback(
    (product: productsType) => {
      dispatch(addFavoList(product));
      setIsFavo(!isFavo);
    },
    [dispatch, isFavo]
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
              <div className={classes.priceAndFavo}>
                <p className={classes.price}> &yen;{formatPrice}</p>
                {isFavo ? (
                  <IconButton
                    onClick={() => addFavo(product)}
                    className={classes.iconFavoCell}
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => addFavo(product)}
                    className={classes.iconCell}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </div>
              <div className="module-spacer--small" />
              <p>{returnCodeToBr(product.description)}</p>
              <div className="module-spacer--small" />
              {product.publications.length > 0 ? (
                <PublicationTable
                  publications={product.publications}
                  addProduct={addProduct}
                />
              ) : (
                <div className={classes.noItem}>在庫なし</div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDetail;
