import { create, StateCreator } from 'zustand';

type CounterState = {
    counter: number
};

type CounterActions = {
    increment: () => void;
    decrement: () => void;
    changeByAmount: (value: number) => void;
}

const counterSlice: StateCreator<CounterState & CounterActions> = (set, get) => {
    return {
        counter: 0,
        decrement: () => {
            //const { counter } = get();
            set((state) => {
                return {...state, counter: state.counter - 1}
            })
        },
        increment: () => {
            set((state) => {
                return {...state, counter: state.counter + 1}
            })
        },
        changeByAmount: (value: number) => {
            set((state) => {
                return {...state, counter: state.counter + value}
            })
        }
    }
}
export const useCounterStore = create<CounterState & CounterActions>(counterSlice);

export const changeByAmount = useCounterStore.getState().changeByAmount;
export const getCounter = () => useCounterStore.getState().counter;