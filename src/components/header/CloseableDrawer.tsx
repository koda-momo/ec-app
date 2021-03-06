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
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { getUserRole } from "../../reducks/users/selecoters";
import { userType } from "../../reducks/users/types";

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

    //検索キーワード
    const [keyword, setKeyword] = useState("");

    /**
     * 検索キーワードを代入.
     */
    const imputKeyword = useCallback((e: any) => {
      setKeyword(e.target.value);
    }, []);

    /**
     * 検索.
     */
    const search = useCallback(
      (e) => {
        selectMenu(e, `/?search=${keyword.toUpperCase()}`);
        setKeyword("");
      },
      [keyword, selectMenu]
    );

    //搾って表示ワード
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

    //管理者か否か
    const selector = useSelector((state: { users: userType }) => state);
    const isAdministrator = getUserRole(selector);

    //メニューバーのメニュー
    const menus = [
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
            <div>
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
                <IconButton onClick={(e) => search(e)}>
                  <SearchIcon />
                </IconButton>
              </div>
              <Divider />
              <List onClick={(e) => onClose(e)}>
                {isAdministrator === "administrator" && (
                  <>
                    <ListItem button onClick={(e) => selectMenu(e, "/edit/")}>
                      <ListItemIcon>{<AddCircleIcon />}</ListItemIcon>
                      <ListItemText primary="商品登録" />
                    </ListItem>
                  </>
                )}

                {menus.map((menu, i) => (
                  <ListItem
                    button
                    key={i}
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
                  <ListItemText primary="サインアウト" />
                </ListItem>
              </List>
              <Divider />
              <List onClick={(e) => onClose(e)}>
                {filters.map((filter, i) => (
                  <ListItem
                    button
                    key={i}
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
