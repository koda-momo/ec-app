export type productsType = {
  id: string; //商品ID
  images: Array<{ id: string; path: string }>; //商品画像情報
  name: string; //商品名
  description: string; //商品の詳細
  category: string; //カテゴリ
  field: string; //分野
  price: number; //価格
  publications: Array<{ publication: string; quantity: number }>; //発行日と数量
  create: { seconds: number; nanoseconds: number }; //作成日
};
export type productActionType = [
  {
    type: string;
    payload: productsType;
  }
];
