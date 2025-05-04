import { Select } from "antd";
import { useShallow } from 'zustand/shallow';
import { setParams, useCoffeeStore } from '../model/coffeeStore';
import { CoffeeCategoryEnum } from '../types/coffeeTypes';

export const SelectCategory = () => {
    const [ params ] = useCoffeeStore(useShallow((s) => [s.params]));
    const options = [
        {
            label: 'Все категории',
            value: CoffeeCategoryEnum.all
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
      onChange={(value) => {setParams({...params, type: value == CoffeeCategoryEnum.all ? undefined : value})}}
      options={options}
    />
  );
};
