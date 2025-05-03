import { Input } from "antd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUrlStorage } from '../helpers/useUrlStorage';
import { appDispatch, RootState } from '../model/coffeeStore';
import { getCoffeeList, setParams } from '../model/listSlice';

export const SearchInput = () => {
  const [ params ] = useSelector((s: RootState) => [s.list.params]);
  const dispatch = useDispatch<appDispatch>();
  useUrlStorage(params, setParams);
  useEffect(() => {
      dispatch(getCoffeeList(params));
    }, [params]);
  
  return (
    <Input
      placeholder="Поиск"
      value={params.text}
      onChange={(e) => setParams({ text: e.target.value })}
    />
  );
};
