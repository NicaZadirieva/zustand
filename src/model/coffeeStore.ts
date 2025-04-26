import axios from 'axios';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CoffeeType, GetCoffeeListReqParams, OrderCoffeeRes, OrderItem } from '../types/coffeeTypes';

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
    coffeeList?: CoffeeType[];
    persistedOrderList?: OrderItem[];
    controller?: AbortController;
};

type CoffeeActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
    addCoffeeToOrder: ({ id, name, subTitle } : { id: number; name: string; subTitle: string }) => void;
    clearCart: () => void;
    createOrder: ({ address } : {address: string}) => Promise<OrderCoffeeRes | void>;
};

const coffeeSlice: StateCreator<CoffeeActions & CoffeeState, [ ["zustand/devtools", never], ["zustand/persist", unknown]]> = (set, get) => ({
    coffeeList: undefined,
    persistedOrderList: undefined,
    controller: undefined,
    createOrder: async ({ address } : {address: string}) => {
        const { controller, persistedOrderList } = get();
        if (controller) {
            controller.abort();
        } 

        const newController = new AbortController();
        set({ controller: newController });
        const { signal } = newController;
        
        try {
            const requestBody = {
                address,
                orderItems: persistedOrderList
            };

            const { data }: { data: OrderCoffeeRes } = await axios.post(BASE_URL + "/order", {
                ...requestBody, signal
            });
            if (data.success) {
                return Promise.resolve();
            } else {
                return Promise.reject(data.message)
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                return;
            }
            console.error(error);
        }
    },
    clearCart: () => {
        const state = get();
        set({...state, persistedOrderList: []});
    },
    addCoffeeToOrder: ({ id, name, subTitle } : { id: number; name: string; subTitle: string}) => {
        const { persistedOrderList } = get();
        let newPersistedOrderList = persistedOrderList;
        if (newPersistedOrderList == undefined) {
            newPersistedOrderList = [];
        } 
        const foundOrderItemIndex: number = newPersistedOrderList.findIndex((orderItem) => {
            return orderItem.id == id;
        })
        if (foundOrderItemIndex !== -1) {
            const foundOrderItem = newPersistedOrderList[foundOrderItemIndex];
            newPersistedOrderList.splice(foundOrderItemIndex, 1, {
                ...foundOrderItem,
                quantity: foundOrderItem.quantity + 1
            })
        } else {
            newPersistedOrderList.push({
                id,
                name,
                quantity: 1,
                size: "L",
                subTitle
            })
        }
        set({persistedOrderList: newPersistedOrderList})
    },
    getCoffeeList: async(params?: GetCoffeeListReqParams) => {
        const { controller } = get();
        if (controller) {
            controller.abort();
        } 

        const newController = new AbortController();
        set({ controller: newController });
        const { signal } = newController;
        
        try {
            const { data } = await axios.get(BASE_URL, {
                params, signal
            });
            set({coffeeList: data});
        } catch (error) {
            if (axios.isCancel(error)) {
                return;
            }
            console.error(error);
        }
    }
})

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
  devtools(
    persist(coffeeSlice, {
      name: "coffeeStore",
      partialize: (state) => ({ persistedOrderList: state.persistedOrderList }),
    }),
    {
      name: "coffeeStore"
    }
  )
);