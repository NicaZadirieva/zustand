import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { hashStorage } from '../helpers/hashStorage';
import { getCoffeeList } from './coffeeStore';

type SearchState = {
    text?: string;
};

type SearchActions = {
    setText: (text: string) => void;
};

const searchSlice : StateCreator<SearchState & SearchActions, [ ["zustand/devtools", never], ["zustand/persist", unknown]]> = (set) => ({
    text: undefined,
    setText: (text) => {
        set({ text }, false, "setText");
    }
})

export const useSearchStore = create<SearchState & SearchActions>()(
    devtools(persist(searchSlice, { name: 'SearchStore', storage: createJSONStorage(() => hashStorage)}), { name: 'SearchStore'})
);

useSearchStore.subscribe((state, prevState) => {
    if (state.text !== prevState.text) {
        getCoffeeList({ text: state.text })
    }
});