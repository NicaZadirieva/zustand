import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { produce } from 'immer';
import { BASE_URL } from "../api/CoreApi";
import { loadState } from '../helpers/hashStorage';
import { OrderCoffeeRes, OrderItem } from "../types/coffeeTypes";
import { CartState } from "./storeTypes";

export const CART_PERSISTENT_STATE = 'cart';
const simpleInitialData: CartState = {
  persistedOrderList: undefined,
  address: undefined,
};
const initialState : CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? simpleInitialData;

export const createOrder = createAsyncThunk(
    'cart/createOrder',
    async function createOrder({
  address,
  persistedOrderList,
}: {
  address: string;
  persistedOrderList: OrderItem[];
}) {
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
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, () => {
        console.log("Успешный запрос");
    });
    builder.addCase(createOrder.rejected, () => {
        console.error("Ошибка");
    });
  },
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    clearCart: (state) => {
      state.persistedOrderList = [];
    },
    addCoffeeToOrder: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        subTitle: string;
      }>
    ) => {
      return produce<CartState>(state, (draftState) => {
        if (!draftState.persistedOrderList) {
          draftState.persistedOrderList = [];
        }
        const foundOrderItemIndex: number = draftState.persistedOrderList.findIndex(
          (orderItem) => {
            return orderItem.id == action.payload.id;
          }
        );
        if (foundOrderItemIndex !== -1) {
          draftState.persistedOrderList[foundOrderItemIndex].quantity += 1;
        } else {
          draftState.persistedOrderList.push({
            id: action.payload.id,
            name: action.payload.name,
            quantity: 1,
            size: "L",
            subTitle: action.payload.subTitle,
          });
        }
       
      })
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setAddress, clearCart, addCoffeeToOrder } = actions;
export default reducer
