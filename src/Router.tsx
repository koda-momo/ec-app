import { Route, Switch } from "react-router";
import SignUp from "./templates/SignUp";
import SignIn from "./templates/SignIn";
import Auth from "./Auth";
import Reset from "./templates/Reset";
import ProductEdit from "./templates/ProductEdit";
import ProductList from "./templates/ProductList";
import ProductDetail from "./templates/ProductDetail";
import CartList from "./templates/CartList";
import OrderConfirm from "./templates/OrderConfirm";
import OrderHistory from "./templates/OrderHistory";
import FavoList from "./templates/FavoList";
import MyPage from "./templates/MyPage";

//Switch+exactで「100%そのURLだった場合、遷移」という設定になる
//(/)?で囲んだ文字列はあっても無くてもマッチ(ダイナミックルートと同じ感じ)

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />

      {/* ログインしていなければ入れないページ */}
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route path={"/edit/(:id)?"} component={ProductEdit} />
        <Route path={"/product/(:id)?"} component={ProductDetail} />
        <Route path={"/cart"} component={CartList} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/favo"} component={FavoList} />
        <Route exact path={"//mypage"} component={MyPage} />
        {/* <Route exact path={"/order/complete"} component={} /> */}
      </Auth>
    </Switch>
  );
};

export default Router;
