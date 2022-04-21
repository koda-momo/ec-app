import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/products/ProductCard";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { productsType } from "../reducks/products/types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  link: {
    color: "#4dd0e1",
    textDecoration: "none",
  },
});

/**
 * 商品一覧.
 */
export const ProductList = () => {
  //dispatchを使用
  const dispatch = useDispatch();
  //selectorを使用
  const selector = useSelector(
    (state: { router: { location: { search: string } } }) => state
  );
  const productSelector = useSelector(
    (state: { products: { list: [productsType] } }) => state
  );
  //CSS
  const classes = useStyles();

  //URLの取得
  const query = selector.router.location.search;

  //URLの後ろから分野を取得
  const field = /^\?field=/.test(query) ? query.split("?field=")[1] : "";
  //URLの後ろからカテゴリを取得
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  //商品一覧
  const products = getProducts(productSelector).products.list;

  /**
   * 商品情報の取得(URL変更の度に発動).
   */
  useEffect(() => {
    //Firebaseの情報を取得
    dispatch(fetchProducts(field, category));
  }, [query]);

  return (
    <>
      <section className="c-section-wrapin">
        <h2 className="u-text__headline u-text-center">商品一覧</h2>

        <div className="p-grid__row">
          {products.length > 0 ? (
            products.map((item, i) => (
              <ProductCard
                key={i}
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <div>アイテムがありません。</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductList;
