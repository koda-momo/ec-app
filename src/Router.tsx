import { Route, Switch } from "react-router";
import Home from "./templates/Home";
import SignUp from "./templates/SignUp";
import SignIn from "./templates/SignIn";
import Auth from "./Auth";
import Reset from "./templates/Reset";
import ProductEdit from "./templates/ProductEdit";
import ProductList from "./templates/ProductList";
import ProductDetail from "./templates/ProductDetail";

//Switch+exactで「100%そのURLだった場合、遷移」という設定になる
//(/)?で囲んだ文字列はあっても無くてもマッチ(ダイナミックルートと同じ感じ)

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/home"} component={Home} />

      {/* ログインしていなければ入れないページ */}
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        {/* <Route exact path={"/product/edit"} component={ProductEdit} /> */}
        <Route exact path={"/product/edit/(:id)?"} component={ProductEdit} />
        <Route path={"/product/(:id)?"} component={ProductDetail} />
      </Auth>
    </Switch>
  );
};

export default Router;
