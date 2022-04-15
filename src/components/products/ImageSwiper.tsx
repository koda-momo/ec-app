import { memo, FC, useState } from "react";
import Swiper from "react-id-swiper";
import NoImage from "../../assets/images/no_image.png";
import "swiper/css/swiper.css";

type Props = {
  images: Array<{ id: string; path: string }>;
};

export const ImageSwiper: FC<Props> = memo(({ images }) => {
  //swiperの設定(swiperにこのparams渡すと諸々設定が出来る)
  const [params] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets", //ちょぼちょぼ
      clickable: true, //ちょぼちょぼクリックが出来るか？
      dynamicBullets: true, //表示しているちょぼは大きく、表示していないのは小さく
    },
    navigation: {
      nextEl: ".swiper-button-next", //前後にうごく矢印の設定
      prevEl: "swiper-button-prev",
    },
    loop: true, //画像のスライドループさせるか？
    spaceBetween: 30, //画像1つ1つの間はどのくらい開けるか？
  });

  return (
    <>
      <Swiper {...params}>
        {images.length === 0 ? (
          <div className="p-media__thumb">
            <img src={NoImage} alt="画像なし" />
          </div>
        ) : (
          images.map((image) => (
            <div className="p-media__thumb" key={image.id}>
              <img src={image.path} alt="商品画像" />
            </div>
          ))
        )}
      </Swiper>
    </>
  );
});
