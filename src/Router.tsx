import { Route, Switch } from "react-router";
import Home from "./templates/Home";
import SignUp from "./templates/SignUp";
import SignIn from "./templates/SignIn";
import Auth from "./Auth";
import Reset from "./templates/Reset";
import ProductEdit from "./templates/ProductEdit";

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
        <Route exact path={"(/)?"} component={Home} />
        {/* <Route exact path={"/product/edit"} component={ProductEdit} /> */}
        <Route path={"/product/edit/(:id)?"} component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
