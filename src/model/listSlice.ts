import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/CoreApi";
import { GetCoffeeListReqParams } from "../types/coffeeTypes";
import { ListState } from "./storeTypes";

const initialState: ListState = {
  coffeeList: undefined,
  controller: undefined,
  params: {
    text: undefined,
  },
};
export const getCoffeeList = createAsyncThunk(
  "list/getCoffeeList",
  async (params?: GetCoffeeListReqParams, /*controller?: AbortController*/) => {
    /*if (controller) {
      controller.abort();
    }

    const newController = new AbortController();
    const { signal } = newController;
*/
    try {
      const { data } = await axios.get(BASE_URL, {
        params,
       // signal,
      });

      return Promise.resolve({
        //controller: newController,
        coffeeList: data,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      console.error(error);
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCoffeeList.fulfilled, (state, action) => {
      state.coffeeList = action.payload?.coffeeList;
      //state.controller = action.payload?.controller;
    });
    builder.addCase(getCoffeeList.rejected, (state, action) => {
      console.error("Произошла ошибка", action.payload);
    });
  },
  reducers: {
    setParams: (state, action: PayloadAction<GetCoffeeListReqParams>) => {
      // TODO: можно ли в редакс использовать функции из стора в самом слайсе
      // const { getCoffeeList, params } = get();
      state.params = {...state.params, ...action.payload};
      //getCoffeeList(params);
    },
  },
});

const { actions, reducer } = listSlice;
export const { setParams } = actions;
export default reducer
