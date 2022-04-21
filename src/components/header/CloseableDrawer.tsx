import { FC, memo, useState, useCallback, useEffect } from "react";
import { TextInput } from "../uikit/TextInput";
import { signOut } from "../../reducks/users/operations";

//MUI
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//CSS
import { createStyles, makeStyles } from "@material-ui/core/styles";

//icon
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: 256,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: "center",
      display: "flex",
      marginLeft: 32,
    },
  })
);

type Props = {
  open: boolean; //メニューバーの開閉
  onClose: (e: any) => void; //メニューバーを閉じるメソッド
  container?: any;
};

export const CloseableDrawer: FC<Props> = memo(
  ({ container, open, onClose }) => {
    //CSS
    const classes = useStyles();
    //dispatch
    const dispatch = useDispatch();

    //検索キーワード
    const [keyword, setKeyword] = useState("");

    /**
     * 検索キーワードを代入.
     */
    const imputKeyword = useCallback((e: any) => {
      setKeyword(e.target.value);
    }, []);

    /**
     * メニューの選択.
     */
    const selectMenu = useCallback(
      (e, path) => {
        dispatch(push(path));
        //メニュー選択後にメニューを閉じる
        onClose(e);
      },
      [dispatch, onClose]
    );

    //検索ワード
    const [filters, setFilters] = useState([
      {
        func: selectMenu,
        label: "すべて",
        id: "all",
        value: "/",
      },
      {
        func: selectMenu,
        label: "フロント",
        id: "client",
        value: "/?field=client",
      },
      {
        func: selectMenu,
        label: "サーバ",
        id: "server",
        value: "/?field=server",
      },
      {
        func: selectMenu,
        label: "その他",
        id: "other",
        value: "/?field=other",
      },
    ]);

    /**
     * カテゴリ一覧の取得.
     */
    useEffect(() => {
      const q = query(collection(db, "categories"), orderBy("order", "asc"));
      getDocs(q).then((snapshots) => {
        const array = new Array<{
          func: (e: any, path: any) => void;
          id: string;
          label: string;
          value: string;
        }>();
        snapshots.forEach((snapshot) => {
          const category = snapshot.data();
          array.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            value: `/?category=${category.id}`,
          });
        });
        setFilters((prevState) => [...prevState, ...array]);
      });
    }, []);

    //メニューバーのメニュー
    const menus = [
      {
        func: selectMenu,
        label: "商品登録",
        icon: <AddCircleIcon />,
        id: "register",
        value: "/edit/",
      },
      {
        func: selectMenu,
        label: "注文履歴",
        icon: <HistoryIcon />,
        id: "history",
        value: "/order/history",
      },
      {
        func: selectMenu,
        label: "プロフィール",
        icon: <PersonIcon />,
        id: "profile",
        value: "/mypage",
      },
    ];

    return (
      <>
        <nav className={classes.drawer}>
          <Drawer
            container={container}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={(e) => onClose(e)}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div onClick={(e) => onClose(e)}>
              <div className={classes.searchField}>
                <TextInput
                  fullWidth={false}
                  label="キーワードを検索"
                  multiline={false}
                  onChange={(e) => imputKeyword(e)}
                  required={false}
                  rows={1}
                  type="text"
                  value={keyword}
                />
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                {menus.map((menu) => (
                  <ListItem
                    button
                    key={menu.id}
                    onClick={(e) => menu.func(e, menu.value)}
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.label} />
                  </ListItem>
                ))}
                <ListItem
                  button
                  key="logout"
                  onClick={() => dispatch(signOut())}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
              <Divider />
              <List>
                {filters.map((filter) => (
                  <ListItem
                    button
                    key={filter.id}
                    onClick={(e) => filter.func(e, filter.value)}
                  >
                    <ListItemText primary={filter.label} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </nav>
      </>
    );
  }
);
