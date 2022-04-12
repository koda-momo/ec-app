import { useDispatch } from "react-redux";
import { signOut } from "../reducks/users/operations";

export const Home = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={dispatch(signOut)}>サインアウト</button>
    </>
  );
};

export default Home;
