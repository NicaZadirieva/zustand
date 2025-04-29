import axios from "axios";
import { StateCreator } from "zustand";
import { BASE_URL } from "../api/CoreApi";
import { GetCoffeeListReqParams } from "../types/coffeeTypes";
import { CartActions, CartState, ListActions, ListState } from "./storeTypes";

const initialState = {
  coffeeList: undefined,
  controller: undefined,
  params: {
    text: undefined,
  },
};
export const listSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  ListActions & ListState
> = (set, get) => ({
  ...initialState,
  setParams: (newParams) => {
    const { getCoffeeList, params } = get();
    set(
      {
        params: {
          ...params,
          ...newParams,
        },
      },
      false,
      "setParams"
    );
    getCoffeeList(params);
  },
  getCoffeeList: async (params?: GetCoffeeListReqParams) => {
    const { controller } = get();
    if (controller) {
      controller.abort();
    }

    const newController = new AbortController();
    set({ controller: newController });
    const { signal } = newController;

    try {
      const { data } = await axios.get(BASE_URL, {
        params,
        signal,
      });
      set({ coffeeList: data });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      console.error(error);
    }
  },
});
