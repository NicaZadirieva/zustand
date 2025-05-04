import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CoffeeType, GetCoffeeListReqParams } from "../types/coffeeTypes";
import { cartSlice } from "./cartSlice";
import { listSlice } from "./listSlice";
import { CartActions, CartState, ListActions, ListState } from "./storeTypes";

export const useCoffeeStore = create<
  CartActions & CartState & ListActions & ListState
>()(
  devtools(
    persist((...arg) => ({ ...listSlice(...arg), ...cartSlice(...arg) }), {
      name: "coffeeStore",
      partialize: (state) => ({
        persistedOrderList: state.persistedOrderList,
        address: state.address,
      }),
    }),
    {
      name: "coffeeStore",
    }
  )
);

export const getCoffeeList = (params?: GetCoffeeListReqParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
export const setParams = (params?: GetCoffeeListReqParams) =>
  useCoffeeStore.getState().setParams(params);
export const createOrder = ({ address }: { address: string }) =>
  useCoffeeStore.getState().createOrder({ address });
export const clearCart = () => useCoffeeStore.getState().clearCart();
export const setAddress = (address: string) =>
  useCoffeeStore.getState().setAddress(address);
export const addCoffeeToOrder = ({
  id,
  name,
  subTitle,
}: {
  id: number;
  name: string;
  subTitle: string;
}) => useCoffeeStore.getState().addCoffeeToOrder({ id, name, subTitle });
export const setData = (data?: CoffeeType[]) => {
  useCoffeeStore.setState({ coffeeList: data});
}