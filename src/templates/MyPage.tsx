import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoItem } from "../components/products/FavoItem";
import { deleteFavo, fetchFavo } from "../reducks/users/operations";
import { getUserName, getFavoList } from "../reducks/users/selecoters";
import { userType } from "../reducks/users/types";

import { makeStyles } from "@material-ui/core/styles";
import { PrimaryButton } from "../components/uikit/PrimaryButton";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  favo: {
    backgroundColor: "rgb(240, 240, 240)",
    padding: 30,
    borderRadius: 30,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
  },
  hiddenScrollBar: {
    overflow: "auto",
    height: 350,
    width: 500,
    "&::-webkit-scrollbar": { display: "none" },
  },
});

/**
 * マイページ.
 */
export const MyPage = () => {
  //css
  const classes = useStyles();
  //selector
  const selector = useSelector((state: { users: userType }) => state);
  const userName = getUserName(selector);
  const favoList = getFavoList(selector);

  //dispatch
  const dispatch = useDispatch();

  //Firebaseからお気に入りリストの取得.
  useEffect(() => {
    dispatch(fetchFavo());
  }, []);

  return (
    <>
      <section className="c-section-wrapin">
        <h2 className="u-text__headline">マイページ</h2>
        <div className={classes.title}>名前:{userName}</div>
        <div className="module-spacer--medium" />
        <PrimaryButton
          label="購入履歴はこちら"
          onClick={() => dispatch(push("/order/history"))}
        />
        <div className="module-spacer--medium" />
        <div className={classes.favo}>
          <div className={classes.title}>お気に入りリスト</div>
          <div className={classes.flex}>
            <div className={classes.hiddenScrollBar}>
              {favoList.length > 0 &&
                favoList.map((favoItem) => <FavoItem favoItem={favoItem} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
