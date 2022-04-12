export type userType = {
  isSignedIn: boolean;
  uid: string;
  userName: string;
};

export type userActionType = {
  type: "SIGN_IN";
  payload: userType;
};
