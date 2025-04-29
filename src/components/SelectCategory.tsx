import { Select } from "antd";
import { useShallow } from 'zustand/shallow';
import { setParams, useCoffeeStore } from '../model/coffeeStore';
import { CoffeeCategoryEnum } from '../types/coffeeTypes';

export const SelectCategory = () => {
    const [ params ] = useCoffeeStore(useShallow((s) => [s.params]));
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
      onChange={(value) => {setParams({...params, type: value == null ? undefined : value})}}
      options={options}
    />
  );
};
