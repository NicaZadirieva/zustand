import axios from "axios";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { BASE_URL } from "../api/CoreApi";
import { OrderCoffeeRes } from "../types/coffeeTypes";
import { CartActions, CartState, ListActions, ListState } from "./storeTypes";

const initialState = {
  persistedOrderList: undefined,
  address: undefined,
};

export const cartSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  CartActions & CartState
> = (set, get) => ({
  ...initialState,
  setAddress: (address: string) => {
    set({ address });
  },
  createOrder: async ({ address }: { address: string }) => {
    const { persistedOrderList } = get();
    try {
      const requestBody = {
        address,
        orderItems: persistedOrderList,
      };

      const { data }: { data: OrderCoffeeRes } = await axios.post(
        BASE_URL + "/order",
        {
          ...requestBody,
        }
      );
      if (data.success) {
        return Promise.resolve();
      } else {
        return Promise.reject(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  },
  clearCart: () => {
    const state = get();
    set({ ...state, persistedOrderList: [] });
  },
  addCoffeeToOrder: ({
    id,
    name,
    subTitle,
  }: {
    id: number;
    name: string;
    subTitle: string;
  }) => {
    set(
      produce<CartState>((draft) => {
        if (!draft.persistedOrderList) {
          draft.persistedOrderList = [];
        }
        const foundOrderItemIndex: number = draft.persistedOrderList.findIndex(
          (orderItem) => {
            return orderItem.id == id;
          }
        );
        if (foundOrderItemIndex !== -1) {
          draft.persistedOrderList[foundOrderItemIndex].quantity += 1;
        } else {
          draft.persistedOrderList.push({
            id,
            name,
            quantity: 1,
            size: "L",
            subTitle,
          });
        }
      })
    );
  },
});
