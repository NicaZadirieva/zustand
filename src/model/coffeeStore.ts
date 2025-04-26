import axios from 'axios';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CoffeeType, GetCoffeeListReqParams } from '../types/coffeeTypes';

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
    coffeeList?: CoffeeType[];
    controller?: AbortController;
};

type CoffeeActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
};

const coffeeSlice: StateCreator<CoffeeActions & CoffeeState, [["zustand/devtools", never]]> = (set, get) => ({
    coffeeList: undefined,
    controller: undefined,
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

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(devtools(coffeeSlice));