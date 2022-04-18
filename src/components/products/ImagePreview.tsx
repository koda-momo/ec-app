import { memo, FC } from "react";

type Props = {
  //画像のID(画像名)
  id: string;
  //画像URL
  path: string;
  //削除のメソッド
  deleteImage: (id: string) => void;
};

/**
 * 登録予定の画像を表示するコンポーネント.
 */
export const ImagePreview: FC<Props> = memo((props) => {
  const { deleteImage, id, path } = props;

  return (
    <>
      <div className="p-media__thumb" onClick={() => deleteImage(id)}>
        <img alt="プレビュー画像" src={path} />
      </div>
    </>
  );
});
