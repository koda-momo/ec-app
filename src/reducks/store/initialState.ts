//src/reducks/store/initialState.ts
const initialState = {
  users: {
    //ログインしているか
    isSignedIn: false,
    //管理者かお客様か
    role: "",
    //ログインしているユーザのID
    uid: "",
    //ログインしているユーザ名
    userName: "",
    //カートリスト
    cart: [],
    //注文履歴
    orders: [],
    //お気に入りリスト
    favoList: [],
  },
  products: {
    list: [],
  },
  items: {
    itemName: "",
    itemImage: "",
  },
};

export default initialState;
