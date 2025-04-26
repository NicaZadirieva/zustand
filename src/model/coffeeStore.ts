import axios from 'axios';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CoffeeType, GetCoffeeListReqParams } from '../types/coffeeTypes';

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
    coffeeList?: CoffeeType[];
};

type CoffeeActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
};

const coffeeSlice: StateCreator<CoffeeActions & CoffeeState, [["zustand/devtools", never]]> = (set) => ({
    coffeeList: undefined,
    getCoffeeList: async(params?: GetCoffeeListReqParams) => {
        try {
            const { data } = await axios.get(BASE_URL, {
                params
            });
            set({coffeeList: data});
        } catch (error) {
            console.error(error);
        }
    }
})

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(devtools(coffeeSlice));