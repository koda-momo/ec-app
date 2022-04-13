export type productType = {
  name: string;
  description: string;
  category: string;
  field: string;
  price: string;
};

export type productActionType = {
  type: "";
  payload: { list: [productType] };
};
