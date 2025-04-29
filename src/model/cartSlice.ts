import axios from 'axios';
import { StateCreator } from 'zustand';
import { BASE_URL } from '../api/CoreApi';
import { OrderCoffeeRes } from '../types/coffeeTypes';
import { CartActions, CartState, ListActions, ListState } from './storeTypes';


const initialState = {
    persistedOrderList: undefined,
    address: undefined,
}

export const cartSlice: StateCreator<
CartActions & CartState & ListActions & ListState, 
[ ["zustand/devtools", never], ["zustand/persist", unknown]],
[ ["zustand/devtools", never], ["zustand/persist", unknown]],
CartActions & CartState
> = (set, get) => ({
    ...initialState,
    setAddress: (address: string) => {
        set({ address });
    },
    createOrder: async ({ address } : {address: string}) => {
        const { persistedOrderList } = get();
        try {
            const requestBody = {
                address,
                orderItems: persistedOrderList
            };

            const { data }: { data: OrderCoffeeRes } = await axios.post(BASE_URL + "/order", {
                ...requestBody
            });
            if (data.success) {
                return Promise.resolve();
            } else {
                return Promise.reject(data.message)
            }
        } catch (error) {
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
})