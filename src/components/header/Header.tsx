import { FC, memo, useState, useCallback } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn, getUserName } from "../../reducks/users/selecoters";
import { userType } from "../../reducks/users/types";
import { push } from "connected-react-router";
import { HeaderMenu } from "./HeaderMenu";
import { CloseableDrawer } from "./CloseableDrawer";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: "#fff",
      color: "#444",
    },
    toolBar: {
      margin: "0 auto",
      maxWidth: 1024,
      width: "100%",
    },
    iconButtons: {
      margin: "0 0 0 auto",
      display: "flex",
      alignItems: "center",
    },
    responsive: {
      display: "block",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  })
);

/**
 * ヘッダー.
 */
export const Header: FC = memo(() => {
  //CSS
  const classes = useStyles();
  //dispatch
  const dispatch = useDispatch();
  //サインインしているか否か
  const selector = useSelector((state: { users: userType }) => state);
  const isSignedIn = getIsSignedIn(selector);
  //サインインユーザ
  const userName = getUserName(selector);

  //メニューバーの開閉
  const [open, setOpen] = useState(false);

  //メニューバー
  const handleDrawerToggle = useCallback(
    (e: any) => {
      //タブかシフトを押した場合はスルー
      if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
        return;
      }
      //それ以外のキーを押した場合はopenを入れ替える
      setOpen(!open);
    },
    [open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src="/book-logo.png"
            alt="ロゴ"
            width="128px"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <span className={classes.responsive}>
                {userName}さん、ようこそ
              </span>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <CloseableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
});
