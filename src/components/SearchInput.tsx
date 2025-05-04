import { Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCustomQuery } from '../helpers/useCustomQuery';
import { useUrlStorage } from "../helpers/useUrlStorage";
import { appDispatch, RootState } from "../model/coffeeStore";
import { getCoffeeList, setParams } from "../model/listSlice";

export const SearchInput = () => {
  const params = useSelector((s: RootState) => s.list.params);
  
  const dispatch = useDispatch<appDispatch>();
  useCustomQuery(params);
  useUrlStorage(params, (newParams) => {
    dispatch(setParams(newParams));
  });
  useEffect(() => {
    dispatch(getCoffeeList(params));
  }, [params]);

  return (
    <Input
      placeholder="Поиск"
      value={params.text}
      onChange={(e) => dispatch(setParams({ text: e.target.value }))}
    />
  );
};
