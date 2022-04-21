import { FC, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import NoImage from "../../assets/images/no_image.png";

//CSS
import { createStyles, makeStyles } from "@material-ui/core/styles";

//MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

//icon
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProduct } from "../../reducks/products/operations";
import { userType } from "../../reducks/users/types";
import { getUserRole } from "../../reducks/users/selecoters";

type Props = {
  id: string; //商品ID
  images: Array<{ id: string; path: string }>;
  name: string; //商品名
  price: number; //商品の価格
};

//CSS
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        margin: 8,
        width: "calc(50% - 16px)",
      },
      [theme.breakpoints.up("md")]: {
        margin: 16,
        width: "calc(33.3333% - 32px)",
      },
    },
    content: {
      display: "flex",
      padding: "16 8",
      textAlign: "left",
      "&:last-child": {
        paddingBottom: 16,
      },
    },
    icon: {
      marginRight: 0,
      marginLeft: "auto",
    },
    media: {
      height: 0,
      paddingTop: "100%",
    },
    price: {
      color: theme.palette.secondary.dark,
      fontSize: 16,
    },
    productName: {
      boxOrient: "vertical",
      display: "-webkit-box",
      fontSize: 14,
      lineHeight: "18px",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        height: 36,
        lineClamp: 2,
      },
      [theme.breakpoints.up("md")]: {
        height: 18,
        lineClamp: 1,
      },
    },
  })
);

/**
 * 商品一覧の一商品だけ表示するカード.
 */
export const ProductCard: FC<Props> = memo(({ id, images, name, price }) => {
  //dispatchを使用
  const dispatch = useDispatch();
  //CSS
  const classes = useStyles();

  //画像表示を整える
  const showImage = images.length > 0 ? images[0].path : NoImage;

  //金額表示を整える
  const formatPrice = price.toLocaleString();

  // メニュー開閉する対象の要素
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  //管理者か否か
  const selector = useSelector((state: { users: userType }) => state);
  const [isAdministrator] = useState(getUserRole(selector));

  /**
   * メニューを開く.
   */
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  /**
   * メニューを閉じる.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={showImage}
          onClick={() => dispatch(push(`/product/${id}`))}
        />
        <CardContent className={classes.content}>
          <div>
            <Typography color="textSecondary" component="p">
              {name}
            </Typography>
            <Typography className={classes.price} component="p">
              &yen;{formatPrice}
            </Typography>
          </div>
          {isAdministrator === "administrator" && (
            <>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => dispatch(push(`/edit/${id}`))}>
                  編集する
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(deleteProduct(id));
                    handleClose();
                  }}
                >
                  削除する
                </MenuItem>
              </Menu>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
});
