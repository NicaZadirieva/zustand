import { composeWithDevTools } from '@redux-devtools/extension';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { saveState } from '../helpers/hashStorage';
import { CART_PERSISTENT_STATE, cartSlice } from './cartSlice';
import { LIST_PERSISTENT_STATE, listSlice } from './listSlice';

export const coffeeReducer = combineSlices(cartSlice, listSlice, {
  cart: cartSlice.reducer,
  list: listSlice.reducer,
})



export const store = configureStore({ reducer: coffeeReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  enhancers: (getDefaultEnhancers) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).devToolsExtension) {
      return getDefaultEnhancers({
    }).concat(composeWithDevTools());
    }
    return getDefaultEnhancers();
  }
 });

 store.subscribe(() => {
  saveState(
    { address: store.getState().cart.address,
      persistedOrderList: store.getState().cart.persistedOrderList
    },
    CART_PERSISTENT_STATE
  );

  saveState(
    {
      coffeeList: store.getState().list.coffeeList,
      params: store.getState().list.params
    },
    LIST_PERSISTENT_STATE
  );
});
export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
/*
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
);*/
/*
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
*/