import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Redux
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";

//history
import * as History from "history";
import { ConnectedRouter } from "connected-react-router";

//history(遷移の履歴)の使用
const history = History.createBrowserHistory();

/**
 * storeを作成する関数を発動.
 */
export const store = createStore(history);

/**
 * StrictMode、Redux、historyを全体で使用.
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
