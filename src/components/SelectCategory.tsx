import { Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, RootState } from '../model/coffeeStore';
import { setParams } from '../model/listSlice';
import { CoffeeCategoryEnum } from '../types/coffeeTypes';

export const SelectCategory = () => {
    const params = useSelector((s: RootState) => s.list.params);
    const dispatch = useDispatch<appDispatch>();
    const options = [
        {
            value: null,
            label: 'Все категории'
        },
        {
            value: CoffeeCategoryEnum.americano,
            label: 'американо'
        }, 
        {
            value: CoffeeCategoryEnum.cappuccino,
            label: 'каппучино'
        },
        {
            value: CoffeeCategoryEnum.latte,
            label: 'латте'
        },
        {
            value: CoffeeCategoryEnum.macchiato,
            label: 'маккиато'
        }
    ]
  return (
    <Select
      showSearch
      defaultActiveFirstOption={true}
      placeholder="Выберите категорию напитка"
      optionFilterProp="label"
      onChange={(value) => {dispatch(setParams({...params, type: value == null ? undefined : value}))}}
      options={options}
    />
  );
};
