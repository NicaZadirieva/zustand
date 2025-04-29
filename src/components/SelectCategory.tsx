import { Select } from "antd";
import { CoffeeCategoryEnum } from '../types/coffeeTypes';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};
export const SelectCategory = () => {
    const options = [
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
      placeholder="Выберите категорию напитка"
      optionFilterProp="label"
      onChange={onChange}
      onSearch={onSearch}
      options={options}
    />
  );
};
