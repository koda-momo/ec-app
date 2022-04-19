import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart, getUserId } from "../../reducks/users/selecoters";
import { cartType, userType } from "../../reducks/users/types";

//MUI
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

//icon
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

//Firestore
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchProductsInCart } from "../../reducks/users/operations";
import { push } from "connected-react-router";

type Props = {
  handleDrawerToggle: (e: any) => void;
};

/**
 * ヘッダーのメニューバー.
 */
export const HeaderMenu: FC<Props> = memo(({ handleDrawerToggle }) => {
  //dispatch
  const dispatch = useDispatch();

  const selector = useSelector((state: { users: userType }) => state);
  //ログイン中のユーザID
  const uid = getUserId(selector);

  //カート情報
  let productsInCart = getProductsInCart(selector);
  /**
   * Firebaseからカート情報を取得して、それに合わせてReduxの情報も書き換える.
   */
  useEffect(() => {
    //Firebaseからカート情報を取得
    const ref = collection(db, "users", uid, "cart");
    //リスナーの設定(?)
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // カートの中身
        const product = change.doc.data() as cartType;
        // change.typeでどんな変化があったのか判別
        const changeType = change.type;

        // change.typeに応じて配列操作
        //追加の場合
        if (changeType === "added") {
          productsInCart.push(product);
        }
        //変更の場合→配列の概要の要素を書き換え
        if (changeType === "modified") {
          const index = productsInCart.findIndex(
            (product) => product.cartId === change.doc.id
          );
          productsInCart[index] = product;
        }
        //削除の場合
        if (changeType === "removed") {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          productsInCart = productsInCart.filter(
            (product) => product.cartId !== change.doc.id
          );
        }
      });

      //Reduxの方もFirebaseに合わせて書き換える
      dispatch(fetchProductsInCart(productsInCart));
    });
    // リスナーの解除(?)
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
});
