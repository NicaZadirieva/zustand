import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GetCoffeeListReqParams } from '../types/coffeeTypes';
import { cartSlice } from './cartSlice';
import { listSlice } from './listSlice';
import { CartActions, CartState, ListActions, ListState } from './storeTypes';


export const useCoffeeStore = create<CartActions & CartState & ListActions & ListState>()(
  devtools(
    persist((...arg)=> ({...listSlice(...arg), ...cartSlice(...arg)}), {
      name: "coffeeStore",
      partialize: (state) => ({ persistedOrderList: state.persistedOrderList, address: state.address }),
    }),
    {
      name: "coffeeStore"
    }
  )
);

export const getCoffeeList = (params?: GetCoffeeListReqParams) => useCoffeeStore.getState().getCoffeeList(params);