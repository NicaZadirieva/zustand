import { Input } from "antd";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUrlStorage } from '../helpers/useUrlStorage';
import { RootState } from '../model/coffeeStore';
import { getCoffeeList, setParams } from '../model/listSlice';

export const SearchInput = () => {
  const [ params ] = useSelector((s: RootState) => [s.list.params]);
  useUrlStorage(params, setParams);
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
