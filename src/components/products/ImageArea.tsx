import { memo, FC, SetStateAction, Dispatch } from "react";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core";
import { ImagePreview } from "./ImagePreview";
import { useEditImage } from "../../hooks/useEditImage";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

type Props = {
  //画像データ(id:画像名,path:画像を取得出来るURL)
  images: Array<{ id: string; path: string }>;
  //画像データをsetする
  setImages: Dispatch<SetStateAction<Array<{ id: string; path: string }>>>;
};

/**
 * 画像をFirebaseのstorageにアップロード、削除出来るコンポーネント.
 */
export const ImageArea: FC<Props> = memo(({ images, setImages }) => {
  //CSS
  const classes = useStyles();
  //hooksを使用
  const { uploadImage, deleteImage } = useEditImage(images, setImages);

  return (
    <>
      <div className="u-text-right">
        <div className="p-grid__list-images">
          {images.length > 0 &&
            images.map((image, i) => (
              <ImagePreview
                key={i}
                id={image.id}
                path={image.path}
                deleteImage={deleteImage}
              />
            ))}
        </div>
        <span>商品情報を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(e) => uploadImage(e)}
            />
          </label>
        </IconButton>
      </div>
    </>
  );
});
