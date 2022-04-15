import { Dispatch } from "react";
import axios from "axios";
import { getPokeAction } from "./actions";

/**
 * ポケモンの情報を取得してstateに代入.
 */
export const getPoke = (id: number) => {
  return async (dispatch: Dispatch<unknown>) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    dispatch(
      getPokeAction({
        name: response.data.name,
        image: response.data.sprites.front_default,
      })
    );
  };
};
