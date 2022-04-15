export const GET_POKE = "GET_POKE";

/**
 * アイテム情報を書き換える.
 * @param itemState 書き換えたい値
 */
export const getPokeAction = (itemState: { name: string; image: string }) => {
  return {
    type: "GET_POKE",
    payload: {
      itemName: itemState.name,
      itemImage: itemState.image,
    },
  };
};
