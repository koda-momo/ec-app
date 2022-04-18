//Reduxから使用するreduxモジュールのimport
import { createStore as reduxCreateStore, combineReducers } from "redux";
//reducersのインポート
import { UserReducer } from "../users/reducers";
import { ProductsReducer } from "../products/reducers";

//reduxでルーティングの管理
import { applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

//非同期処理の為にredux-thunk使用
import thunk from "redux-thunk";

/**
 * state管理の倉庫.
 * @returns
 */
export default function createStore(history: History) {
  return reduxCreateStore(
    //分けて作成している変数達を1つの倉庫にまとめる(user,product等)
    combineReducers({
      router: connectRouter(history),
      users: UserReducer,
      products: ProductsReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
