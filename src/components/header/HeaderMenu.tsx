import { FC, memo } from "react";

//MUI
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

//icon
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

type Props = {
  handleDrawerToggle: (e: any) => void;
};

/**
 * ヘッダーのメニューバー.
 */
export const HeaderMenu: FC<Props> = memo(({ handleDrawerToggle }) => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
});
