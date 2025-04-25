import axios from 'axios';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CoffeeType } from '../types/coffeeTypes';

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
    coffeeList?: CoffeeType[];
};

type CoffeeActions = {
    getCoffeeList: () => void;
};

const coffeeSlice: StateCreator<CoffeeActions & CoffeeState, [["zustand/devtools", never]]> = (set) => ({
    coffeeList: undefined,
    getCoffeeList: async() => {
        try {
            const { data } = await axios.get(BASE_URL);
            set({coffeeList: data});
        } catch (error) {
            console.error(error);
        }
    }
})

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(devtools(coffeeSlice));