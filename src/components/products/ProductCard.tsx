import { FC, memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

type Props = {
  imagePath: string;
  name: string;
  price: number;
};

const useStyles = makeStyles((theme) => ({
  root: {
    //スマホ表示(幅がsmよりも低い時)
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      //スマホの際は商品2つ並べる(ページの半分の幅-マージン分)
      width: "calc(50%-16px)",
    },
    //スマホより大きい
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      //通常は商品3つ並べる(ページの半分の幅-マージン分)
      width: "calc(33.3333%-32px)",
    },
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    // 疑似要素
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

export const ProductCard: FC<Props> = memo(({ imagePath, name, price }) => {
  //dispatchを使用
  const dispatch = useDispatch();
  //CSS
  const classes = useStyles();

  //金額表示を整える
  const formatPrice = price.toLocaleString();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          image={imagePath}
          className={classes.media}
          onClick={() => dispatch(push("/"))}
        />
        <CardContent className={classes.content}>
          <div>
            <Typography component="p">{name}</Typography>

            <Typography component="p" className={classes.price}>
              &yen;{formatPrice}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
});
