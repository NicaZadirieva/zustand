import { Input } from "antd";
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useCustomQuery } from '../helpers/useCustomQuery';
import { useUrlStorage } from '../helpers/useUrlStorage';
import { getCoffeeList, setParams, useCoffeeStore } from "../model/coffeeStore";

export const SearchInput = () => {
  const [ params ] = useCoffeeStore(useShallow((s) => [s.params]));
  useUrlStorage(params, setParams);
  useCustomQuery(params);
  useEffect(() => {
      getCoffeeList(params);
    }, [params]);
  
  return (
    <Input
      placeholder="Поиск"
      value={params.text}
      onChange={(e) => setParams({ text: e.target.value })}
    />
  );
};
