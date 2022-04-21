import { useCallback, useEffect } from "react";
import { userType } from "../reducks/users/types";
import { FavoItem } from "../components/products/FavoItem";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getFavoList } from "../reducks/users/selecoters";

//MUI
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import { deleteFavo, fetchFavo } from "../reducks/users/operations";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

/**
 * お気に入りリスト.
 */
export const FavoList = () => {
  //selectorでカート情報取得
  const selector = useSelector((state: { users: userType }) => state);
  const favoList = getFavoList(selector);

  //dispatch
  const dispatch = useDispatch();

  //CSS
  const classes = useStyles();

  /**
   * Firebaseからお気に入りリスト取得.
   */
  useEffect(() => {
    dispatch(fetchFavo());
  }, []);

  /**
   * お気に入りから削除.
   */
  const deleteFavoItem = useCallback(
    (id: string) => {
      dispatch(deleteFavo(id));
      dispatch(fetchFavo());
    },
    [dispatch]
  );

  return (
    <>
      <section className="c-section-wrapin">
        <h2 className="u-text__headline">お気に入りリスト</h2>
        <List className={classes.root}>
          {favoList.length > 0 ? (
            favoList.map((favo, i) => (
              <FavoItem
                favoItem={favo}
                deleteFavoItem={deleteFavoItem}
                key={i}
              />
            ))
          ) : (
            <div>お気に入りに登録されていません</div>
          )}
        </List>
      </section>
    </>
  );
};

export default FavoList;
