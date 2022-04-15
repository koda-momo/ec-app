import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/products/ProductCard";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { productsType } from "../reducks/products/types";

//CSS
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    //スマホサイズ(sm)以下の場合のCSS
    [theme.breakpoints.down("sm")]: {
      gap: 3,
    },
    //タブレットサイズ(md)以上の場合のCSS
    [theme.breakpoints.up("md")]: {
      gap: 5,
    },
  },
}));

/**
 * 製品一覧.
 */
export const ProductList = () => {
  //dispatchを使用
  const dispatch = useDispatch();
  //selectorを使用
  const selector = useSelector(
    (state: { products: { list: [productsType] } }) => state
  );
  //CSS
  const classes = useStyles();

  const [products, setProducts] = useState<Array<productsType>>([]);

  /**
   * 商品情報の取得.
   */
  useEffect(() => {
    //Firebaseの情報を取得
    dispatch(fetchProducts());
    //
    const items = getProducts(selector).products.list;
    setProducts(items);
  }, [dispatch, selector]);

  return (
    <>
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {products.length > 0 &&
            products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default ProductList;
