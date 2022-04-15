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
