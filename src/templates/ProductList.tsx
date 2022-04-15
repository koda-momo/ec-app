import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/products/ProductCard";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { productsType } from "../reducks/products/types";

/**
 * 製品一覧.
 */
export const ProductList = () => {
  //dispatchを使用
  const dispatch = useDispatch();

  const selector = useSelector(
    (state: { products: { list: [productsType] } }) => state
  );
  const products = getProducts(selector).products.list;

  /**
   * 商品情報の取得.
   */
  useEffect(() => {
    //Firebaseの情報を取得
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {products.length > 0 &&
            products.map((item) => (
              <div key={item.id}>
                <ProductCard
                  imagePath={
                    item.images.length > 0
                      ? item.images[0].path
                      : "images/no_image.png"
                  }
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default ProductList;
