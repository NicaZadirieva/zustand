import { create, StateCreator } from 'zustand';

type CounterState = {
    counter: number
};

const counterSlice: StateCreator<CounterState> = () => {
    return {
        counter: 0
    }
}
export const useCounterStore = create<CounterState>(counterSlice);