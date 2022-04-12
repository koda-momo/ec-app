//文字列を定数に入れてあげる(Reducerで使う際に依頼名を判断するため)
export const SIGN_IN = "SIGN_IN";

//isSignedInをtrueに、uidにはこれを入れる、userNameにはこれを入れるという指示
//今回代入でuserState使うから引数で受け取っているけれど、必要なければ不要
export const signInAction = (userState: {
  id: string;
  role: string;
  userName: string;
}) => {
  return {
    type: "SIGN_IN", //依頼名
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.id,
      userName: userState.userName,
    },
  };
};

//文字列を定数に入れてあげる(Reducerで使う際に依頼名を判断するため)
export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
  return {
    type: "SIGN_OUT", //依頼名
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      userName: "",
    },
  };
};
