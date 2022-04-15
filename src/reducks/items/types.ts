export type itemType = {
  items: {
    itemName: string;
    itemImage: string;
    item: string;
  };
};

export type itemActionType = {
  type: "GET_POKE";
  payload: {
    itemName: string;
    itemImage: string;
  };
};
